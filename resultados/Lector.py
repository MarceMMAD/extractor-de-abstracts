# -*- coding: utf-8 -*-

import csv

import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import homogeneize_latex_encoding

import os
from RISparser import readris
from pprint import pprint


def read_acm():
	with open('acm_final.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = row["author"]
			title = row["title"]
			source = "ACM"
			url = "http://dl.acm.org/citation.cfm?id=" + row["id"] + "&preflayout=flat"
			abstract = row["abstract"]
			new_row = [author, title, source, url, abstract]
			new_rows.append(new_row)
			print new_row
			print "\n\n"



def read_springer():
	with open('Springer_results.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = row["Authors"]
			title = row["Item Title"]
			source = "Springer"
			url = row["URL"]
			abstract = row["Abstract"]
			new_row = [author, title, source, url, abstract]
			new_rows.append(new_row)
			print new_row
			print "\n\n"


def read_wiley():
	with open('wiley-search-results-all.bib') as bibtex_file:
	
		bib_database = bibtexparser.load(bibtex_file)
		new_rows = []
		# print bib_database.entries
		for entry in bib_database.entries:
			if "author" in entry.keys():
				author = entry["author"].encode("utf-8")
				title = entry["title"].encode("utf-8")
				source = "Wiley"
				abstract = entry["abstract"].encode("utf-8")
				if "url" in entry.keys():
					url = entry["url"].encode("utf-8")
				else:
					url = ""
				new_row = [author, title, source, url, abstract]
				new_rows.append(new_row)
				print new_row
				print "\n\n"



def read_taylor():
	new_rows = []
	archivos = os.listdir("Taylor")
	# archivos = ["results_1-50.csv"]
	for archivo in archivos:
		with open('Taylor/' + archivo) as csvfile:
			reader = csv.DictReader(csvfile)
			# new_rows = []
			for row in reader:
				author = row["Author"]
				title = row["Title"]
				source = "Taylor"
				url = row["URL"]
				abstract = row["Abstract"]
				new_row = [author, title, source, url, abstract]
				new_rows.append(new_row)
				print new_row
				print "\n\n"


# read_acm()
# read_springer()
read_wiley()
# read_taylor()
