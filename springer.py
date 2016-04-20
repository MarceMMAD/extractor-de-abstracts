# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests
import csv

def get_abstract_springer(url):

	req = requests.get(url)

	# Comprobamos que la peticion nos devuelve un Status Code = 200
	statusCode = req.status_code
	if statusCode == 200:

		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
		html = BeautifulSoup(req.text, 'html.parser')

		# Obtenemos todos los divs donde estan las entradas
		entradas = html.find_all('section',{'class':'Abstract'})
		
		try:
			abstract = entradas[0].find('p', {'class' : 'Para'}).getText()
			return abstract.encode("utf-8")
		except:
			return "--Abstract not found--"
	else:
		print ("Status Code %d") %statusCode

def write_csv_springer(abstracts):
	file1 = open("SearchResults.csv", "rb")
	reader = csv.reader(file1)
	new_rows_list = []
	i = 0
	for row in reader:
		#if row[8] == 'URL':
		new_row = [row[0], row[1], row[2], row[3],row[4],row[5],row[6],row[7],row[8],row[9],abstracts[i]]
		new_rows_list.append(new_row)
		i = i + 1
		if i > 150:
		 	break
	file1.close()   # <---IMPORTANT

	# Do the writing
	file2 = open("springer3.csv", "wb")
	writer = csv.writer(file2)
	writer.writerows(new_rows_list)
	file2.close()				



# =========================================================================================
# SPRINGER
springer_abstract = ["Abstract"]
with open('SearchResults.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	i = 0
	for row in reader:
		if i > 150:
			break
		abstract = get_abstract_springer(row["URL"])
		#write_csv_springer(abstract, row)
		springer_abstract.append(abstract)
		i = i + 1


write_csv_springer(springer_abstract)

