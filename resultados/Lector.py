# -*- coding: utf-8 -*-
import csv
import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import homogeneize_latex_encoding


def read_acm():
	with open('acm_final.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = row["author"]
			title = row["title"]
			source = row["id"]
			abstract = row["abstract"]
			new_row = [author, title, source, abstract]
			print new_row
			print "\n\n"



def read_springer():
	with open('Springer_results.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = row["Authors"]
			title = row["Item Title"]
			source = row["URL"]
			abstract = row["Abstract"]
			new_row = [author, title, source, abstract]
			print new_row
			print "\n\n"

# read_springer()

def read_wiley():
	with open('wiley-search-results-all.bib') as bibtex_file:
		parser = BibTexParser()
		parser.customization = homogeneize_latex_encoding
		bib_database = bibtexparser.load(bibtex_file, parser=parser)
		new_rows = []
		# print bib_database.entries
		for entry in bib_database.entries:
			# author = entry["author"]
			# title = entry["title"]
			# source = entry["url"]
			# abstract = entry["abstract"]
			# new_row = [author, title, "source", abstract]
			# print new_row
			# print "\n\n"
			print entry

read_wiley()
