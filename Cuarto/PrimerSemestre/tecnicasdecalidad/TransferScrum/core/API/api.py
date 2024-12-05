from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import multiprocessing
from dotenv import get_key
import pymysql
from pymysql.cursors import DictCursor
import traceback
import json
import random

# Datos para conexion con database
DATABASE_ENV:str = "database_parameters.env"
db_host:str|None = get_key(DATABASE_ENV, "HOST")
db_username:str|None = get_key(DATABASE_ENV, "USERNAME")
db_password:str|None = get_key(DATABASE_ENV, "PASSWORD")
db_port:int = int(get_key(DATABASE_ENV, "PORT"))
db_name:str|None = get_key(DATABASE_ENV, "DATABASE")

# * Conecta la database y comprueba si la conexion fue exitosa o no
try:
    db = pymysql.connect(host=db_host, port=db_port, user=db_username,password=db_password , database=db_name)
except:
    print("DATABASE CONNECTION FAIL")
    traceback.print_exc()
else:
    print("DATABASE CONNECTION OK")
    print(db.host_info)

app = FastAPI(debug=True)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/totem/calcular-pago")
def totem_calcular_pago(distancia:int, vehicle_id:int):
    TARIFA_BASE = 300
    VALOR_POR_DISTANCIA = 1.5

    cursor = db.cursor(DictCursor)
    cursor.execute("SELECT precio FROM vehiculos WHERE id=%s;", vehicle_id)
    valor_vehiculo = cursor.fetchone().get("precio")
    cursor.close()

    tarifa_distancia = round(distancia * VALOR_POR_DISTANCIA)
    data = {
        "distancia": tarifa_distancia,
        "vehiculo": valor_vehiculo,
        "total": TARIFA_BASE + tarifa_distancia + valor_vehiculo
    }

    return data


@app.post("/totem/ingresar-reserva")
def totem_ingresar_reserva(payload: dict = Body(...)):
    cursor = db.cursor(DictCursor)

    print("INICIO PROCESO DE INGRESO RESERVA")
    
    # Ingresar Cliente
    cliente:dict = payload["cliente"]
    cliente["id"] = random.getrandbits(64)
    query = "INSERT INTO clientes(id ,num_documento, nombres, apellidos, telefono, email) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.execute(query, [cliente["id"] , cliente["documento"], cliente["nombres"], cliente["apellidos"], cliente["telefono"], cliente["email"]])
    print("Creacion de Cliente OK")
    
    # Obtener transfer disponible
    with open("data.json", 'r', encoding="utf-8") as file:
        data_transfers:list[dict] = json.load(file)
        transfers_disponibles = [transfer.get("transfer_id") for transfer in data_transfers if transfer.get("status") == "online"]
    
    cursor.execute("SELECT t.id as id FROM transfers as t WHERE t.vehiculo_id = %s AND t.id IN %s",
                   [payload["travel"]["id_vehiculo"], transfers_disponibles])
    transfer_id = int(cursor.fetchone()["id"])
    print("Obtencion transfer disponible OK")

    # Ingresar Reserva
    reserva:dict = payload["travel"]
    reserva["id"] = random.getrandbits(64)
    query = """INSERT INTO reservas( id, cliente_id, transfer_id, fecha_hora, destino, latitud, longitud, cant_asientos, cant_equipaje)
                VALUES (%s, %s, %s, NOW(), %s, %s, %s, %s, %s)"""
    cursor.execute(query,
                   (reserva["id"],
                    cliente["id"],
                    transfer_id,
                    reserva["address"],
                    reserva["latitude"],
                    reserva["longitude"],
                    reserva["asientos"],
                    reserva["equipaje"]))
    
    print("Creacion de Reserva OK")

    # Ingresar Pago
    pago:dict = payload["pago"]
    query = "INSERT INTO pagos(reserva_id, monto, fecha_hora) VALUES (%s, %s, NOW())"
    cursor.execute(query, [reserva["id"], pago["total"]])
    print("Creacion de Pago OK")

    cursor.close()
    db.commit()
    print("Reserva Ingresada!")

    status_actualizado = chofer_cambiar_status_transfer(transfer_id, "reservado")
    if status_actualizado:
        print(f"Status de Transfer {transfer_id} ACTUALIZADO")
    else:
        print(f"No se pudo actualizar Status de Transfer")

    return payload

@app.get("/totem/obtener-vehiculos-disponibles")
def totem_obtener_vehiculos_disponibles(equipaje:int, asientos:int):
    with open("data.json", 'r', encoding="utf-8") as file:
        data_transfers:list[dict] = json.load(file)
        transfers_disponibles = [transfer.get("transfer_id") for transfer in data_transfers if transfer.get("status") == "online"]
    
    if not transfers_disponibles: return []


    cursor = db.cursor(DictCursor)
    query = """SELECT DISTINCT v.*
    FROM transfers as t JOIN vehiculos as v ON t.vehiculo_id = v.id
    WHERE t.id IN %s AND (v.equipaje >= %s AND v.capacidad >= %s)
    ORDER BY v.precio ASC
    """
    cursor.execute(query, [transfers_disponibles, equipaje, asientos])
    data = cursor.fetchall()
    cursor.close()

    return data

@app.get("/chofer/obtener-chofer-por-email")
def chofer_obtener_chofer_por_email(chofer_email:str, transfer:bool):
    cursor = db.cursor(DictCursor)
    if(transfer):
        cursor.execute(
            "SELECT t.id as transfer_id, c.* FROM choferes as c JOIN transfers as t ON c.id = t.chofer_id WHERE c.email = %s",
            [chofer_email])
        chofer = cursor.fetchone()

    else:
        cursor.execute("SELECT * FROM choferes as c WHERE c.email = %s", [chofer_email])
        chofer = cursor.fetchone()
    cursor.close()

    return chofer

@app.get("/chofer/obtener-info-reserva")
def chofer_obtener_info_reserva(id_transfer:int):

    # Obtener datos de reserva
    cursor = db.cursor(DictCursor)
    query = """SELECT r.id as reserva_id, r.cliente_id, r.latitud, r.longitud, r.destino, r.cant_asientos, r.cant_equipaje
                FROM reservas AS r
                WHERE r.transfer_id = %s AND r.estado = 'p'"""
    cursor.execute(query, [id_transfer])
    data = cursor.fetchone()
    data["reserva_id"] = str(data["reserva_id"])
    data["cliente_id"] = str(data["cliente_id"])
    
    # Obtener nombre de cliente
    cursor.execute("SELECT concat(nombres, ' ', apellidos) AS cliente_name FROM clientes WHERE id = %s", [data["cliente_id"]])
    data.update(cursor.fetchone())
    cursor.close()

    return data

@app.get("/chofer/obtener-status-transfer")
def chofer_obtener_status_transfer(id_transfer:int):
    try:
        with open("data.json", encoding="utf-8") as file:
            data:list[dict] = json.load(file)
            for transfer in data:
                if transfer["transfer_id"] == id_transfer:
                    return  {"status": transfer["status"]}
        
        return None
    except:
        traceback.print_exc()
        return {"result": "error"}
    
@app.post("/chofer/cambiar-status-transfer")
def chofer_cambiar_status_transfer(id_transfer:int, status:str):
    try:
        data:list[dict]
        # get file
        with open("./data.json", "r", encoding="utf-8") as in_file:
            data = json.load(in_file)
        
        for transfer in data:
            if transfer["transfer_id"] == id_transfer:
                transfer["status"] = status
                with open("./data.json", "w", encoding="utf-8") as out_file:
                    json.dump(data, out_file, ensure_ascii=False, indent=4)
        
        return True
    except:
        traceback.print_exc()
        return False

@app.get("/chofer/cancelar-reserva")
def chofer_cancelar_reserva(id_reserva:int):
    try:
        cursor = db.cursor(DictCursor)
        cursor.execute("UPDATE reservas SET estado = 'c' WHERE id = %s", [id_reserva])
        print(cursor.rowcount)
        db.commit()
        cursor.close()

        return True
    except:
        traceback.print_exc()
        return False


if __name__ == "__main__":
    multiprocessing.freeze_support()
    uvicorn.run("api:app", port=8002, reload=True)