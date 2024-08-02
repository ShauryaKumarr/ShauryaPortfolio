import numpy as np
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, GPT2Model
import nltk
import math

model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model_1 = model = GPT2Model.from_pretrained(model_name)
model_2 = GPT2LMHeadModel.from_pretrained(model_name)
model.eval()

# Word entropy functions

def word_entropy(text):
    words = nltk.word_tokenize(text)
    embeddings = []
    for word in words:
        inputs = tokenizer(word, return_tensors="pt")
        with torch.no_grad():
            outputs = model_1(**inputs)
        embeddings.append(outputs.last_hidden_state.mean(dim=1).squeeze().numpy())

    total_words = len(embeddings)
    entropy = 0.0

    sim_matrix = np.zeros((total_words, total_words))
    for i in range(total_words):
        for j in range(i, total_words):
            if i == j:
                sim_matrix[i, j] = 1.0
            else:
                cos_sim = np.dot(embeddings[i], embeddings[j]) / (np.linalg.norm(embeddings[i]) * np.linalg.norm(embeddings[j]))
                sim_matrix[i, j] = cos_sim
                sim_matrix[j, i]= cos_sim

    probabilities = sim_matrix.mean(axis=1)
    probabilities = probabilities / probabilities.sum()

    for prob in probabilities:
        entropy -= prob *math.log2(prob)

    return entropy

def compute_word_entropy(vignettes):
    scores = {}
    count = 1
    for vignette in vignettes:
        scores.update({str(count) : word_entropy(vignette)})
        count += 1
    return scores

# Semantic entropy functions

def semantic_entropy(prob_dist):
    epsilon = 1e-9
    prob_dist = np.clip(prob_dist, epsilon, 1.0)
    entropy = -np.sum(prob_dist * np.log2(prob_dist))
    return entropy

def get_probs(text):
    inputs = tokenizer(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model_2(**inputs, labels=inputs['input_ids'])
        logits = outputs.logits
    probs = torch.softmax(logits, dim=-1).numpy()
    return probs

def compute_semantic_entropy(vignettes):
    scores = {}
    count = 1
    for vignette in vignettes:
        probs = get_probs(vignette)
        entropies = [semantic_entropy(probs[0, i]) for i in range(probs.shape[1])]
        sem_entropy = np.mean(entropies)
        scores.update({str(count) : sem_entropy})
        count += 1
    return scores
