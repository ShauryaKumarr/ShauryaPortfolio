import pandas as pd
import nltk
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

# Download the necessary NLTK resources
nltk.download('punkt')

# Function to read the content of a file
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()
    
# Function to calculate BLEU score
def calculate_bleu(context, vignette):
    context_tokens = [nltk.word_tokenize(context)]
    vignette_tokens = nltk.word_tokenize(vignette)

    # Calculate BLEU score with smoothing
    smoothie = SmoothingFunction().method4
    bleu_score = sentence_bleu(context_tokens, vignette_tokens, smoothing_function=smoothie)
    return bleu_score

# Function to save scores to a CSV file
def save_scores_to_csv(score, output_csv):
    data = {
        'Metric': ['BLEU'],
        'Score': [score]
    }

    df = pd.DataFrame(data)
    df.to_csv(output_csv, index=False)

# Main function to execute the whole process
def main(context_file, vignettes_file, output_csv):
    context = read_file(context_file)
    vignettes = read_file(vignettes_file)
    score = calculate_bleu(context, vignettes)
    save_scores_to_csv(score, output_csv)

# Example usage
context_file = 'context_hyperthyroidismabstract.txt'
vignettes_file = 'vignettes_hyperthyroidism.txt'
output_csv = 'result_scores.csv'

main(context_file, vignettes_file, output_csv)
