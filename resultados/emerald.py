# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests
import csv

def get_abstract_emerald(url):

	req = requests.get(url)

	# Comprobamos que la peticion nos devuelve un Status Code = 200
	statusCode = req.status_code
	if statusCode == 200:

		# Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
		html = BeautifulSoup(req.text, 'html.parser')

		# Obtenemos todos los divs donde estan las entradas
		entradas = html.find_all('article',{'class':'article'})
		
		try:
			abstract = entradas[0].find('dd', {'class' : 'abstract'}).getText()
			return abstract.encode("utf-8")
		except:
			return "--Abstract not found--"
	else:
		print ("Status Code %d") %statusCode

def write_csv_emerald(abstracts):
	file1 = open("emerald_1-64.csv", "rb")
	reader = csv.reader(file1)
	new_rows_list = []
	i = 0
	for row in reader:
		new_row = [row[2], row[3], row[4], row[5],row[6],row[7],row[8],row[9],row[10],row[13], row[14], row[15],abstracts[i]]
		new_rows_list.append(new_row)
		i = i + 1
	file1.close()   # <---IMPORTANT

	# Do the writing
	file2 = open("emeraldResults.csv", "wb")
	writer = csv.writer(file2)
	writer.writerows(new_rows_list)
	file2.close()				



# =========================================================================================
# SPRINGER
emerald_abstract = ["Abstract"]
with open('emerald.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		abstract = get_abstract_emerald(row["URL"])
		emerald_abstract.append(abstract)


write_csv_emerald(emerald_abstract)

