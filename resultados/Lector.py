# -*- coding: utf-8 -*-

import csv

from bs4 import BeautifulSoup
import requests

import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import homogeneize_latex_encoding

import os
# from RISparser import readris
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


def read_wos():
	new_rows = []
	# files = ["results_1-50", "results_51-100", "results_101-150", "results_151-200", "results_201-250", "results_251-300", "results_301-315"]
	files = ["results_1-50"]

	for file in files:
		html =  BeautifulSoup(open("Web_of_Science/" + file), "lxml")
		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
		# html = BeautifulSoup("SAGE_final_results.htm", 'lxml')
		# Obtenemos todos los divs donde estan las entradas
		# texto = html.getText()
		# lineas = texto.split("Record")
		# for linea in lineas:
		# 	print linea.encode("utf-8")
		# 	print "-------------------------------------------------------"
		# print len(lineas)
		entradas = html.find_all('table')
		for entrada in entradas:
			band = 0
			campos = entrada.find_all('td')
			for campo in campos:
				titulo_campo = campo.find('b')
				if titulo_campo:

					if titulo_campo.string == "Title:":
						title = campo.getText().replace("Title:", "").replace("\n", "")
						band = band + 1
						# print "TITLE= " + title
					if titulo_campo.string == "By:":
						authors = campo.getText().replace("By:", "").replace("\n", "")
						band =  band + 1
						# print "AUTHORS= " + authors
					if titulo_campo.string == "Abstract:":
						abstract = campo.getText().replace("Abstract:", "").replace("\n", "")
						band = band + 1
						# print "ABSTRACT= " + abstract
					

					# print title
					# print authors
					# print abstract
			if band == 3:
				url = "No se como poner el de Web_of_Science"
				source = "Web_of_Science"
				print "TITLE= " + title
				print "AUTHORS= " + authors
				print "ABSTRACT= " + abstract
				new_rows.append([title, authors, source, url, abstract])
			print "-------------------------------------------------------------------------------------"

		

# read_acm()
# read_springer()
# read_wiley()
# read_taylor()
read_wos()
