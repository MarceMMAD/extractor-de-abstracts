# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests
import csv

def parse_sage():
	html =  BeautifulSoup(open("SAGE_final_results.htm"), "lxml")
	# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
	# html = BeautifulSoup("SAGE_final_results.htm", 'lxml')
	# Obtenemos todos los divs donde estan las entradas
	
	entradas = html.find_all('li',{'class':'marked-citation-results-cit',})
	# entradas = entradas[0].find_all('div')
	# entradas = entradas[0].find_all('p')
	# abstract = ""
	for entrada in entradas:
		title = entrada.find('span',{'class':'cit-title',}).getText()
		# print title 

		autores_item = entrada.find_all('span',{'class':'cit-auth cit-auth-type-author',})
		autores_texto = []
		for autor in autores_item:
			autores_texto.append(autor.getText())
		authors = ", ".join(autores_texto)
		# print authors
		# print "\n\n\n"
		source = "Sage"
		# url = entrada.find('ul',{'class':'cit-views',})
		# url = url.find('li',{'class':'first-item',})
		# url = url.find('a')["href"]
		url = entrada.find('ul',{'class':'cit-views',}).find('li',{'class':'first-item',}).find('a')["href"]
		# print url
		try:
			abstract = entrada.find('div',{'class':'section abstract',}).find('p').getText().replace("\n", "")
		except:
			# abstract = entrada.find('div',{'class':'article abstract-view',}).find('p').getText().replace("\n", "")
			abstract = "NO ABSTRACT FO UND"
			print title
			print '\n'
		# print abstract
		# print [title, authors, source, url, abstract]
		
	


parse_sage()