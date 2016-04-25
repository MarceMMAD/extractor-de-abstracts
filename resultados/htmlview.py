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

path = "unificado2.xls"
html = "unificado_aux.html"

def crear_html_view():
	book = xlrd.open_workbook(path)
	sheet = book.sheet_by_index(0)
	new_rows = []
	for row_idx in range(1, sheet.nrows):
 		author = sheet.cell(row_idx,0).value
		title = sheet.cell(row_idx,1).value
		source = sheet.cell(row_idx,2).value
		url = sheet.cell(row_idx,3).value
		abstract = sheet.cell(row_idx,4).value
		new_row = [author.encode("utf-8"), title.encode("utf-8"), source, url, abstract.encode("utf-8")]
		new_rows.append(new_row)
		# print new_row
		# print "\n\n"
	f = open(html, "w")
	f.write( """<!DOCTYPE html><HTML lang="en"><HEAD><meta charset="utf-8"/><TITLE>Prueba</TITLE></HEAD><BODY>""")
	for entry in new_rows:
		f.write( "<br><h1>" + entry[1] + "</h1>")
		f.write( "<br><b>Autores: </b>" + entry[0])
		f.write( "<br><b>Fuente: </b>" + entry[2])
		f.write( '<br><b>URL: </b><a href="' + entry[3] + '">' + entry[3] +"</a>")
		f.write( "<br><b>Abstract: </b>" + entry[4])

	f.write( """</BODY></HTML>""")

# crear_html_view()

def get_ieee_author(link):
	# new_rows = []
	# f_links = open("Elsevier_links.txt")
	# links = f_links.readlines()
	# f_links.close()
	# # links = ["http://www.sciencedirect.com/science/article/pii/S2095263515000709"]
	# for link in links:
	# print link
	req = requests.get(link.encode("utf-8").replace("\n", ""))
	statusCode = req.status_code
	if statusCode == 200:

		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
		html = BeautifulSoup(req.text, 'html.parser')
		# print(html.prettify())
		# f=open("nuevo.html", "w")
		# f.write(str(html))
		# f.close

		# html =  BeautifulSoup(open("nuevo.html"), "html.parser")
		try:
			authors = html.find("div", {"class" : "authors"}).getText().replace("\n", "").replace("\t", "").replace("\r", "")
		except:
			authors = "---NO AUTHOS FOUND---"
		# print authors
		return authors

		# authors = html.find("ul", {"class" : "authorGroup noCollab svAuthor"}).getText()
		# source = "Elsevier"
		# url = link
		# try:
		# 	abstract = html.find("div", {"class" : "abstract svAbstract "}).getText()
		# except:
		# 	abstract = "--NO ABSTRACT FOUND--"

		# new_row = [authors, title, source, url, abstract]
		# new_rows.append(new_row)
		# print new_row
		# print "\n\n"

	else:
		print ("Status Code %d") %statusCode

def read_ieee():
	with open('IEEE-unique_results.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		new_rows = []
		for row in reader:
			author = "--sin autores--"
			title = row["DocumentTitle"]
			source = "IEEE"
			url = row["PDF_Link"]
			author = get_ieee_author(url)
			# print author
			abstract = ""
			new_row = [author, title, source, url, abstract]
			new_rows.append(new_row)
			print new_row
			# print "\n\n"
	# return new_rows

# art-authors
read_ieee()