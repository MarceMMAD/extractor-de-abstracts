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
		return abstract
	else:
		return "---ERROR---Status Code %d" %statusCode

def write_csv_acm(abstracts):
	file1 = open("acm.csv", "rb")
	reader = csv.reader(file1)
	new_rows_list = []
	i = 0
	for row in reader:
  		#if row[8] == 'URL':
		new_row = [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19], row[20], row[21], row[22], row[23], row[24],  row[25], row[26], abstracts[i].encode("utf-8")]
		new_rows_list.append(new_row)
		i = i + 1
		if i > 4:
			break
	file1.close()   # <---IMPORTANT

	# Do the writing
	file2 = open("acm2.csv", "wb")
	writer = csv.writer(file2)
	writer.writerows(new_rows_list)
	file2.close()

def get_abstract_springer(url):

	req = requests.get(url)

	# Comprobamos que la petición nos devuelve un Status Code = 200
	statusCode = req.status_code
	if statusCode == 200:

		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
		html = BeautifulSoup(req.text)

		# Obtenemos todos los divs donde estan las entradas
		entradas = html.find_all('section',{'class':'Abstract'})
		entradas = entradas[0].find_all('p', {'class' : 'Para'})
		abstract = ""
		for parrafo in entradas:
			abstract = abstract + parrafo.getText()
		return abstract
	else:
		print ("Status Code %d") %statusCode

# =========================================================================================
# ACM 
acm_abstracts = ["abstract"]
with open('acm.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	i = 0
	for row in reader:
		# print(row['id'], row['author'])
		abstract = get_abstract_acm(row["id"])
		# print row["id"] + " =" + abstract.encode("ascii") + "\n\n\n"
		acm_abstracts.append(abstract)
		i = i +1
		if i > 4:
			break
write_csv_acm(acm_abstracts)



