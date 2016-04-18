# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests

url = "http://link.springer.com/article/10.1007/s10660-015-9183-6"

# Realizamos la petición a la web
req = requests.get(url)

# Comprobamos que la petición nos devuelve un Status Code = 200
statusCode = req.status_code
if statusCode == 200:

    # Pasamos el contenido HTML de la web a un objeto BeautifulSoup()
    html = BeautifulSoup(req.text)

    # Obtenemos todos los divs donde estan las entradas
    entradas = html.find_all('section',{'class':'Abstract'})
    abstract = entradas[0].find('p', {'class' : 'Para'}).getText()
    print (abstract)
        # print entradas
    # Recorremos todas las entradas para extraer el título, autor y fecha
    # for i,entrada in enumerate(entradas):
    #     print entrada
    #     # Con el método "getText()" no nos devuelve el HTML
    #     #titulo = entrada.find('span', {'class' : 'tituloPost'}).getText()
    #     # Sino llamamos al método "getText()" nos devuelve también el HTML
    #     #autor = entrada.find('span', {'class' : 'autor'})
    #     #fecha = entrada.find('span', {'class' : 'fecha'}).getText()
    #     abstract = entrada.find('p', {'class' : 'Para'}).getText()
    #     # Imprimo el Título, Autor y Fecha de las entradas
    #     #print "%d - %s  |  %s  |  %s" %(i+1,titulo,autor,fecha)
    #     print (abstract)
else:
    print ("Status Code %d") %statusCode