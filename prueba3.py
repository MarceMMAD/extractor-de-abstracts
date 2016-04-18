import csv

with open('acm.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        print(row['id'], row['author'])