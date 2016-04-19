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
		# entradas = entradas[0].find_all('p', {'class' : 'Para'})
		# abstract = ""
		# for parrafo in entradas:
		# 	abstract = abstract + parrafo.getText()
		try:
			abstract = entradas[0].find('p', {'class' : 'Para'}).getText()
			#print abstract.encode("utf-8")
			return abstract
		except:
			return "--Abstract not found--"
	else:
		print ("Status Code %d") %statusCode

#def write_csv_springer(abstracts, row):
def write_csv_springer(abstracts):
	new_rows_list = []
	i = 0
	with open('SearchResults.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		for row in reader:
			new_row = [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], abstracts[i]]
			new_rows_list.append(new_row)
			i = i + 1
			if i > 3:
				break

	with open('springer2.csv', 'w', newline='') as csvfile:
		writer = csv.writer(csvfile)
		writer.writerows(new_rows_list)				
	# for row in reader:
	# 	new_row = [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], abstracts[i]]
	# 	new_rows_list.append(new_row)
	# 	i = i + 1
	# 	if i > 149:
	# 		break
	# file1.close()   # <---IMPORTANT
	# for abstract in abstracts:
	# 	new_row = [abstract]
	# 	new_rows_list.append(new_row)
	# Do the writing
	#new_row = [row["Item Title"], row["Publication Title"], row["Book Series Title"], row["Journal Volume"], row["Journal Issue"], row["Item DOI"], row["Authors"], row["Publication Year"], row["URL"], row["Content Type"], abstracts]
	# new_rows_list.append(new_row)
	# file2 = open('springer2.csv', 'w', newline='')
	# writer = csv.writer(file2)
	# writer.writerows(new_rows_list)

	# file2.close()


# =========================================================================================
# SPRINGER
springer_abstract = ["Abstract"]
with open('SearchResults.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	i = 0
	for row in reader:
		abstract = get_abstract_springer(row["URL"])
		#write_csv_springer(abstract, row)
		springer_abstract.append(abstract)
		i = i +1
		if i > 3:
			break

write_csv_springer(springer_abstract)

