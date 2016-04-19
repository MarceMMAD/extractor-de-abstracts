# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests
import csv

def get_abstract_acm(id):
	# url = "http://dl.acm.org/citation.cfm?id=2479751&preflayout=flat"
	url = "http://dl.acm.org/citation.cfm?id=" + id + "&preflayout=flat"

	# Realizamos la petición a la web
	req = requests.get(url)
	# Comprobamos que la petición nos devuelve un Status Code = 200
	statusCode = req.status_code
	if statusCode == 200:
		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
		html = BeautifulSoup(req.text, 'lxml')
		# Obtenemos todos los divs donde estan las entradas
		
		entradas = html.find_all('div',{'class':'flatbody',})
		entradas = entradas[0].find_all('div')
		entradas = entradas[0].find_all('p')
		abstract = ""
		for parrafo in entradas:
			abstract = abstract + parrafo.getText()
		print(str(id) + ": " + abstract.encode("utf-8") + "\n\n")
		return abstract.encode("utf-8")
	else:
		return "---ERROR---Status Code %d" %statusCode

def write_csv_acm(abstracts):
	file1 = open("acm.csv", "rb")
	reader = csv.reader(file1)
	new_rows_list = []
	i = 0
	for row in reader:
		#if row[8] == 'URL':
		new_row = [abstracts[i]]
		new_rows_list.append(new_row)
		i = i + 1
		# if i > 4:
		# 	break
	file1.close()   # <---IMPORTANT

	# Do the writing
	file2 = open("acm_abstracts.csv", "wb")
	writer = csv.writer(file2)
	writer.writerows(new_rows_list)
	file2.close()

# def get_abstract_springer(url):

# 	req = requests.get(url)

# 	# Comprobamos que la petición nos devuelve un Status Code = 200
# 	statusCode = req.status_code
# 	if statusCode == 200:

# 		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
# 		html = BeautifulSoup(req.text)

# 		# Obtenemos todos los divs donde estan las entradas
# 		entradas = html.find_all('section',{'class':'Abstract'})
# 		# entradas = entradas[0].find_all('p', {'class' : 'Para'})
# 		# abstract = ""
# 		# for parrafo in entradas:
# 		# 	abstract = abstract + parrafo.getText()
# 		try:
# 			abstract = entradas[0].find('p', {'class' : 'Para'}).getText()
# 			print abstract.encode("utf-8")
# 			return abstract.encode("utf-8")
# 		except:
# 			return "--Abstract not found--"
# 	else:
# 		print ("Status Code %d") %statusCode

# def write_csv_springer(abstracts):
# 	file1 = open("SearchResults.csv", "rb")
# 	reader = csv.reader(file1)
# 	new_rows_list = []
# 	i = 0
# 	for row in reader:
# 		#if row[8] == 'URL':
# 		new_row = [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], abstracts[i]]
# 		new_rows_list.append(new_row)
# 		i = i + 1
# 		if i >= 3:
# 			break
# 	file1.close()   # <---IMPORTANT

# 	# Do the writing
# 	file2 = open("springer2.csv", "wb")
# 	writer = csv.writer(file2)
# 	writer.writerows(new_rows_list)
# 	file2.close()

# =========================================================================================
# ACM 
acm_abstracts = ["abstract"]
with open('acm.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	i = 0
	for row in reader:
		abstract = get_abstract_acm(row["id"])
		acm_abstracts.append(abstract)
		i = i +1
		# if i > 4:
		# 	break
write_csv_acm(acm_abstracts)

# =========================================================================================
# SPRINGER
# springer_abstract = ["Abstract"]
# with open('SearchResults.csv') as csvfile:
# 	reader = csv.DictReader(csvfile)
# 	i = 0
# 	for row in reader:
# 		# print(row['id'], row['author'])
# 		abstract = get_abstract_springer(row["URL"])
# 		# print row["id"] + " =" + abstract.encode("ascii") + "\n\n\n"
# 		springer_abstract.append(abstract)
# 		i = i +1
# 		if i > 4:
# 			break
# write_csv_springer(springer_abstract)

