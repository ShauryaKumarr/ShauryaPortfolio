import pandas as pd
from rouge import Rouge

# access to .txt files
def open_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()
    

# score calculation using ROUGE technique 
def sum_measurement_calculation(context, vignettes):
    rouge = Rouge()
    scores = rouge.get_scores(context, vignettes)
    return scores[0]    

# put results into new CSV 
'''
    explanation of each of the categories:
        metric: ROUGE used (rouge-1 unigrams, rouge-2 bigrams, rouge-l longest common subsequence)
        precision: comparison of generated text to reference text
        recall: comparison of reference text to generated text
        F1 score: harmonic mean of precision and recall scores
    
    ROUGE score results are in decimal places, but correspond to a percentage score (i.e .3591 = 35.91%)
'''
def save_rouge_scores(scores, output_csv):
    data = {
        'Metric': [],
        'Precision': [],
        'Recall': [],
        'F1':[]
    }

    for metric, score in scores.items():
        data['Metric'].append(metric)
        data['Precision'].append(score['p'])
        data['Recall'].append(score['r'])
        data['F1'].append(score['f'])
    
    df = pd.DataFrame(data)
    df.to_csv(output_csv, index=False)

# main function to run all at consecutively
def main(context_file, vignettes_file, output_csv):
    context = open_file(context_file)
    vignettes = open_file(vignettes_file)
    scores = sum_measurement_calculation(context, vignettes)
    save_rouge_scores(scores, output_csv)

# test case
context = 'context_hyperthyroidismabstract.txt'
vignettes = 'vignettes_hyperthyroidism.txt'
output_csv = 'result_scores.csv'

main(context, vignettes, output_csv)

