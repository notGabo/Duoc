from os import makedirs, remove, listdir
from zipfile import ZipFile
from time import sleep
from sys import stdout
import requests
import json
import csv


# constantes
urlApi = "https://us-central1-duoc-bigdata-sc-2023-01-01.cloudfunctions.net/datos_transporte_et"
contadorArchivos = 0
carpetaPrueba2 = "prueba2"
carpetaPrueba3 = "prueba3"

def GetRespuestaApi(url: str) -> dict:
    """
    Realiza una petición GET a una API y retorna la respuesta en formato JSON

    ### PARAMETROS:
    - url (str): URL de la API a consultar
    ### RETORNO:
    - dict: Respuesta de la API en formato JSON
    """
    try:
        respuesta = requests.get(url).json()
    except Exception as e:
        # En caso de error, respuesta sera el mensaje de error en formato json
        respuesta = {"error": str(e)}
    return respuesta

def DescargarZipDeApi(api:dict) -> None:
    """
    Descarga un archivo zip de una url proporcionada en la respuesta de una api.
    Se asume que la direccion del recurso a buscar esta en la siguiente direccion
    resources[i].url

    ### PARAMETROS:
    - api (dict): Respuesta de la API en formato JSON
    ### RETORNO:
    - None
    """
    cantidadArchivos = len(api["result"]["resources"])
    print(f"Se encontraron {cantidadArchivos} archivos")
    for recurso in api["result"]["resources"]:
        contador = api['result']['resources'].index(recurso)+1
        try:
            if recurso.get("url"):
                nombreArchivo = recurso["name"].replace(" ", "_")+".zip"        # Nombre del archivo a descargar
                #with open(f"{nombreCarpeta}/{nombreArchivo}", "wb") as f:
                with open(nombreArchivo, "wb") as f:                            # Descargar archivo handler
                    archivo = requests.get(recurso["url"], stream=True)         # Peticion para descargar archivo
                    longitud_archivo = archivo.headers.get("content-length")
                    if longitud_archivo is None:                                # Si el peso del archivo es nada, se descarga un archivo vacio
                        f.write(archivo.content)
                    else:
                        dl = 0
                        longitud_archivo = int(longitud_archivo)                # Peso del archivo
                        print(f"[{contador}/{cantidadArchivos}] {nombreArchivo}")
                        for data in archivo.iter_content(chunk_size=4096):      # Handler barra de carga
                            dl += len(data)
                            f.write(data)
                            descargado = int(30 * dl / longitud_archivo)
                            stdout.write('\r[{}{}]'.format('█' * descargado, '.' * (30-descargado)))
                            stdout.flush()
                        stdout.write('\n')
                pass
            else:
                print("No se encontraron recursos para descargar")
                pass
        except Exception as e:
            print(f"Error al descargar archivo: {str(e)}")

def ExtraerArchivoZip(archivoZip: str, indice: int, total: int) -> None:
    """
    Extrae el contenido de un archivo zip en una carpeta de su mismo nombre.

    ### PARAMETROS:
    - nombreArchivo (str): Nombre del archivo a leer
    - indice (int): Indice del archivo en la lista.
    - total (int): Cantidad total de archivos
    ### RETORNO:
    - None
    """
    nombreCarpeta = "Lotes"
    rutaADescomprimir = f"{nombreCarpeta}/{archivoZip.replace('.zip', '')}"
    print(f"[{indice}/{total}] Descomprimiendo {archivoZip} en {rutaADescomprimir}")
    with ZipFile(archivoZip, "r") as archivo:
        try:
            makedirs(rutaADescomprimir)         # Crear carpeta para descomprimir
        except FileExistsError:                 # Si la carpeta ya existe, se elimina y se crea de nuevo
            pass
        except Exception as e:                  # En caso de error, se imprime el error y se continua
            print(f"Error al crear carpeta: {str(e)}")
        archivo.extractall(rutaADescomprimir)   # Extraer contenido del archivo zip
    pass

def EliminarZip(archivoZip: str, indice: int, total: int) -> None:
    """
    Elimina un archivo zip.

    ### PARAMETROS:
    - nombreArchivo (str): Nombre del archivo a eliminar
    - indice (int): Indice del archivo en la lista.
    - total (int): Cantidad total de archivos
    ### RETORNO:
    - None
    """
    print(f"[{indice}/{total}] Eliminando {archivoZip}")
    try:
        remove(archivoZip)
    except Exception as e:
        print(f"Error al eliminar archivo: {str(e)}")
    pass

def TransformarTxtACsv(archivoTxt: str, indice: int, total: int) -> None:
    """
    Transforma un archivo de texto a un archivo CSV.

    ### PARAMETROS:
    - archivoTxt (str): Nombre del archivo a transformar
    - indice (int): Indice del archivo en la lista.
    - total (int): Cantidad total de archivos
    ### RETORNO:
    - None
    """
    nombreCsv = archivoTxt.replace(".txt", ".csv")
    print(f"[{indice}/{total}] Transformando {archivoTxt} a {nombreCsv}")
    with open(archivoTxt, "r") as txt:
        with open(nombreCsv, "w", newline="") as csvFile:
            csvWriter = csv.writer(csvFile)
            for linea in txt.readlines():
                csvWriter.writerow(linea.split(";"))
    pass


# Obtencion de links mediante api
respuesta = GetRespuestaApi(urlApi)
DescargarZipDeApi(respuesta)
archivosZip = [f for f in listdir() if f.endswith(".zip")]
totalArchivos = len(archivosZip)

# Extraccion de archivos zip
for archivo in archivosZip:             # Iterar sobre los archivos zip para extraerlos
    contador = archivosZip.index(archivo)+1
    ExtraerArchivoZip(archivo, contador, totalArchivos)

# Eliminación de archivos zip para ahorrar espacio
for archivo in archivosZip:             # Iterar sobre los archivos zip para eliminarlos
    contador = archivosZip.index(archivo)+1
    EliminarZip(archivo, contador, totalArchivos)

# Declaracion de variables para transoformación de archivos txt a csv
carpetasLotes = [f for f in listdir(f"{carpetaPrueba2}/Lotes") ]
totalLotes = len(carpetasLotes)

# Transformación de archivos txt a csv
for lote in carpetasLotes:
    archivosTxt = [f for f in listdir(f"{carpetaPrueba2}/Lotes/{lote}")]
    for archivo in archivosTxt:
        # contador de archivos lote
        contadorArchivos = contadorArchivos + 1
        TransformarTxtACsv(f"{carpetaPrueba2}/Lotes/{lote}/{archivo}", contadorArchivos, totalArchivos)
print(f"Total de archivos: {contadorArchivos}")
print(f"Total Lotes: {totalLotes}")