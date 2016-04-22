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

import xlrd
import xlwt
from xlwt import Workbook, easyxf

import magic


def detect_encoding(path):
	blob = open(path).read()
	m = magic.Magic(mime_encoding=True)
	encoding = m.from_buffer(blob)
	print path + " = " + encoding


def read_acm():
	# with open('acm_final.csv') as csvfile:
	# 	reader = csv.DictReader(csvfile)
	# 	new_rows = []
	# 	for row in reader:
	# 		author = row["author"]
	# 		title = row["title"]
	# 		source = "ACM"
	# 		url = "http://dl.acm.org/citation.cfm?id=" + row["id"] + "&preflayout=flat"
	# 		abstract = row["abstract"]
	# 		new_row = [author, title, source, url, abstract]
	# 		new_rows.append(new_row)
	# 		# print new_row
	# 		# print "\n\n"
	# return new_rows
	book = xlrd.open_workbook("acm_final.xls")
	sheet = book.sheet_by_index(0)
	new_rows = []
	for row_idx in range(1, sheet.nrows):
 		author = sheet.cell(row_idx,2).value
		title = sheet.cell(row_idx,6).value
		source = "ACM"
		url = "http://dl.acm.org/citation.cfm?id=" + str(sheet.cell(row_idx,1).value) + "&preflayout=flat"
		abstract = sheet.cell(row_idx,27).value
		new_row = [author.encode("utf-8"), title.encode("utf-8"), source, url, abstract.encode("utf-8")]
		new_rows.append(new_row)
		# print new_row
		# print "\n\n"
	return new_rows



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
			# print new_row
			# print "\n\n"
	return new_rows

def read_wiley():
	with open('wiley-search-results-all.bib') as bibtex_file:
	
		bib_database = bibtexparser.load(bibtex_file)
		new_rows = []
		for entry in bib_database.entries:
			if "author" in entry.keys():
				author = entry["author"].encode("utf-8")
				title = entry["title"].encode("utf-8")
				source = "Wiley"
				abstract = entry["abstract"].encode("utf-8")
				if "link" in entry.keys():
					url = entry["link"].encode("utf-8")
				else:
					url = "---NO URL FOUND---"
				new_row = [author, title, source, url, abstract]
				new_rows.append(new_row)
				# print new_row
				# print "\n\n"
	return new_rows


def read_taylor():
	new_rows = []
	archivos = os.listdir("Taylor")
	# archivos = ["results_1-50.csv"]
	for archivo in archivos:
		with open('Taylor/' + archivo) as csvfile:
			reader = csv.DictReader(csvfile)
			for row in reader:
				author = row["Author"]
				title = row["Title"]
				source = "Taylor"
				url = row["URL"]
				abstract = row["Abstract"]
				new_row = [author, title, source, url, abstract]
				new_rows.append(new_row)
				# print new_row
				# print "\n\n"
	return new_rows

def read_wos():
	new_rows = []
	files = ["results_1-50", "results_51-100", "results_101-150", "results_151-200", "results_201-250", "results_251-300", "results_301-315"]
	# files = ["results_1-50"]

	for file in files:
		html =  BeautifulSoup(open("Web_of_Science/" + file), "lxml")

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
					if titulo_campo.string == "By:":
						authors = campo.getText().replace("By:", "").replace("\n", "")
						band =  band + 1
					if titulo_campo.string == "Abstract:":
						abstract = campo.getText().replace("Abstract:", "").replace("\n", "")
						band = band + 1
					
			if band == 3:
				url = "--NO URL FOUND--"
				source = "Web_of_Science"
				# print "TITLE= " + title
				# print "AUTHORS= " + authors
				# print "ABSTRACT= " + abstract
				new_rows.append([title.encode("utf-8"), authors.encode("utf-8"), source, url, abstract.encode("utf-8")])
			# print "-------------------------------------------------------------------------------------"
	return new_rows


def read_ieee():
	with open('IEEE-unique_results.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = "--sin autores--"
			title = row["DocumentTitle"]
			source = "IEEE"
			url = row["PDF_Link"]
			abstract = row["Abstract"]
			new_row = [author, title, source, url, abstract]
			new_rows.append(new_row)
			# print new_row
			# print "\n\n"
	return new_rows

def read_emerald():
	with open('emeraldResults.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = row['Author']
			title = row["Title"]
			source = "Emerald"
			url = row["URL"]
			abstract = row["Abstract"]
			new_row = [author, title, source, url, abstract]
			new_rows.append(new_row)
			# print new_row
			# print "\n\n"
	return new_rows

def read_sage():
	html =  BeautifulSoup(open("SAGE_final_results.htm"), "lxml")
	new_rows = []
	entradas = html.find_all('li',{'class':'marked-citation-results-cit',})
	for entrada in entradas:
		title = entrada.find('span',{'class':'cit-title',}).getText().encode("utf-8")

		autores_item = entrada.find_all('span',{'class':'cit-auth cit-auth-type-author',})
		autores_texto = []
		for autor in autores_item:
			autores_texto.append(autor.getText())
		authors = ", ".join(autores_texto).encode("utf-8")
		source = "Sage"
		url = entrada.find('ul',{'class':'cit-views',}).find('li',{'class':'first-item',}).find('a')["href"].encode("utf-8")
		try:
			abstract = entrada.find('div',{'class':'section abstract',}).find('p').getText().replace("\n", "").encode("utf-8")
		except:
			abstract = "NO ABSTRACT FOUND"
			# print title
			# print '\n'
		new_row = [authors, title, source, url, abstract]
		new_rows.append(new_row)
		# print new_row
	return new_rows

def read_elsevier_p2():
	with open('elsevier_parte2.bib') as bibtex_file:
	
		bib_database = bibtexparser.load(bibtex_file)
		new_rows = []
		for entry in bib_database.entries:
			if "author" in entry.keys():
				author = entry["author"].encode("utf-8")
				title = entry["title"].encode("utf-8")
				source = "Elsevier"
				abstract = entry["abstract"].encode("utf-8")
				if "link" in entry.keys():
					url = entry["link"].encode("utf-8")
				else:
					url = "---NO URL FOUND---"
				new_row = [author, title, source, url, abstract]
				new_rows.append(new_row)
				print new_row
				print "\n\n"
	return new_rows

def read_elsevier_p1():
	new_rows = []
	f_links = open("Elsevier_links.txt")
	links = f_links.readlines()
	f_links.close()
	# links = ["http://www.sciencedirect.com/science/article/pii/S2095263515000709"]
	for link in links:
		print link
		req = requests.get(link.encode("utf-8").replace("\n", ""))
		statusCode = req.status_code
		if statusCode == 200:

			# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
			html = BeautifulSoup(req.text, 'lxml')
			# print(html.prettify())
			f=open("nuevo.html", "w")
			f.write(str(html))
			f.close

			html =  BeautifulSoup(open("nuevo.html"), "lxml")

			title = html.find("h1", {"class" : "svTitle"}).getText()
			authors = html.find("ul", {"class" : "authorGroup noCollab svAuthor"}).getText()
			source = "Elsevier"
			url = link
			try:
				abstract = html.find("div", {"class" : "abstract svAbstract "}).getText()
			except:
				abstract = "--NO ABSTRACT FOUND--"

			new_row = [authors, title, source, url, abstract]
			new_rows.append(new_row)
			print new_row
			print "\n\n"

		else:
			print ("Status Code %d") %statusCode


def write_html(entries):
	f = open("nuevo.html", "w")
	f.write( """<!DOCTYPE html><HTML lang="en"><HEAD><meta charset="utf-8"/><TITLE>Prueba</TITLE></HEAD><BODY>""")
	for entry in entries:
		# try:
		# 	title = entry[1].encode("utf-8")
		# except:
		# 	title = entry[1]
		# try:


		f.write( "<br><h1>" + entry[1] + "</h1>")
		f.write( "<br><b>Autores: </b>" + entry[0])
		f.write( "<br><b>Fuente: </b>" + entry[2])
		f.write( '<br><b>URL: </b><a href="' + entry[3] + '">' + entry[3] +"</a>")
		f.write( "<br><b>Abstract: </b>" + entry[4])

	f.write( """</BODY></HTML>""")

def unir_results ():
	# cada elemento de 'results' es una lista con los siguientes elementos 0:autores, 1:titulo, 2:fuente, 3:url, 4:abstract
	# estoy sumando de a uno nomas porque algunos necesitan se encodeados a unicode y aun no se cual
	results = read_acm() + read_wiley() + read_taylor() + read_wos() + read_ieee() + read_emerald() + read_sage()
	#print (results[0][0])
	#aca deberia escribirse el excel

	# Creamos un nuevo archivo xls
	workbook = xlwt.Workbook(encoding='utf-8')
	# Creamos una hoja
	sheet = workbook.add_sheet('Sheet_1')
	# Cargamos la cabecera
	sheet.write(0,0,"Autor/es",easyxf('font: bold true;'))
	sheet.write(0,1,"Título",easyxf('font: bold true;'))
	sheet.write(0,2,"Fuente",easyxf('font: bold true;'))
	sheet.write(0,3,"URL",easyxf('font: bold true;'))
	sheet.write(0,4,"Abstract",easyxf('font: bold true;'))

	# Escribimos los resultados de ACM
	i = 1
	for result in results:
		sheet.write(i,0,result[0])
		sheet.write(i,1,result[1])
		sheet.write(i,2,result[2])
		sheet.write(i,3,result[3])
		sheet.write(i,4,result[4])
		i = i + 1

	workbook.save('unificado.xls')
	write_html(results)



## los que tienen caracteres raros son taylo y emerald

# print read_acm()
# print read_springer()
# print read_wiley()
# print read_taylor()
# print read_wos()
# print read_ieee()
# print read_emerald()
# print read_sage()
# read_elsevier_p2()
# read_elsevier_p1()

# unir_results()