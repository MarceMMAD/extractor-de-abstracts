# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests
import csv

def read_sage():
	html =  BeautifulSoup(open("SAGE_final_results.htm"), "lxml")
	new_rows = []
	entradas = html.find_all('li',{'class':'marked-citation-results-cit',})
	for entrada in entradas:
		title = entrada.find('span',{'class':'cit-title',}).getText()

		autores_item = entrada.find_all('span',{'class':'cit-auth cit-auth-type-author',})
		autores_texto = []
		for autor in autores_item:
			autores_texto.append(autor.getText())
		authors = ", ".join(autores_texto)
		source = "Sage"
		url = entrada.find('ul',{'class':'cit-views',}).find('li',{'class':'first-item',}).find('a')["href"]
		try:
			abstract = entrada.find('div',{'class':'section abstract',}).find('p').getText().replace("\n", "")
		except:
			abstract = "NO ABSTRACT FOUND"
			# print title
			# print '\n'
		new_row = [authors, title, source, url, abstract]
		new_rows.append(new_row)
	return new_rows[]




read_sage()