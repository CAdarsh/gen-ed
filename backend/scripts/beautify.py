# take txt scraped pages and remove all the html tags and [2] type citations from the output folder

import os
import re
import csv
import pandas as pd
import numpy as np


def remove_html_tags(text):
    """Remove html tags from a string"""
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)


def remove_citations(text):
    """Remove citations from a string even if the citation is spread across multiple lines"""
    clean = re.compile('\[\d+\]')
    return re.sub(clean, '', text)


def remove_newlines(text):
    """Remove newlines from a string"""
    clean = re.compile('\n')
    return re.sub(clean, ' ', text)


def remove_extra_spaces(text):
    """Remove extra spaces from a string"""
    clean = re.compile(' +')
    return re.sub(clean, ' ', text) 


files = os.listdir('output_con')
for file in files:
    with open('output_con/' + file, 'r') as f:
        text = f.read()
        text = remove_newlines(text)
        text = remove_html_tags(text)
        text = remove_citations(text)
        text = remove_extra_spaces(text)
        with open('output_con/' + file, 'w') as f:
            f.write(text)