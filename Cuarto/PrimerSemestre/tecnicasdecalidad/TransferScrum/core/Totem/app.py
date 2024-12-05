from flask import Flask, render_template, url_for, redirect, session, request
import requests
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html")

@app.route("/", methods=["GET", "POST"])
def inicio():
    if(request.method == "POST"):
        session["reserva"] = {}
        print(session["reserva"])
        return redirect(url_for("destino"))

    return render_template("inicio.html")

@app.route("/datos", methods=["GET", "POST"])
def datos():
    if request.method == "POST":
        cliente_data:dict = {
            "nombres": request.form.get("nombres").lower(),
            "apellidos": request.form.get("apellidos").lower(),
            "documento": request.form.get("documento").lower(),
            "email": request.form.get("email").lower(),
            "telefono": request.form.get("telefono")
        }
        data = session["reserva"]
        data["cliente"] = cliente_data
    
        session["reserva"] = data
        print(session["reserva"])

        return redirect(url_for("opere_tarjeta"))
    
    return render_template("datos.html")

@app.route("/destino", methods=["GET", "POST"])
def destino():
    if request.method == "POST":
        travel_data = {
            "eta": request.form.get("eta"),
            "distance": request.form.get("distance"),
            "latitude": request.form.get("latitude"),
            "longitude": request.form.get("longitude"),
            "address": request.form.get("address"),
        }

        data = session["reserva"]
        data["travel"] = travel_data
        session["reserva"] = data
        print(session["reserva"])
        return redirect(url_for("equipaje_asientos"))

    return render_template("destino.html")

@app.route("/equipaje-asientos", methods=["GET", "POST"])
def equipaje_asientos():
    if request.method == "POST":
        
        data = session["reserva"]
        data["travel"]["asientos"] = int(request.form.get("asientos"))
        data["travel"]["equipaje"] = int(request.form.get("equipaje"))
        session["reserva"] = data
        
        return redirect(url_for("transfer"))
    
    return render_template("equipaje_asientos.html")

@app.route("/transfer", methods=["GET", "POST"])
def transfer():
    if request.method == "POST":
        data = session["reserva"]
        data["travel"]["id_vehiculo"] = request.form.get("id-vehiculo")
        session["reserva"] = data

        return redirect(url_for("resumen"))
    
    asientos = session["reserva"]["travel"]["asientos"]
    equipaje = session["reserva"]["travel"]["equipaje"]

    vehiculos_json:dict = requests.get(f"http://localhost:8002/totem/obtener-vehiculos-disponibles?equipaje={equipaje}&asientos={asientos}").json()

    return render_template("transfer.html", vehiculos=vehiculos_json)

@app.route("/resumen", methods=["GET", "POST"])
def resumen():
    distancia = session["reserva"]["travel"]["distance"]
    vehiculo = session["reserva"]["travel"]["id_vehiculo"]
    if(request.method == "GET"):
        try:
            valores:dict = requests.get(f"http://localhost:8002/totem/calcular-pago?distancia={distancia}&vehicle_id={vehiculo}").json()
        except:
            valores = {"vehiculo":0, "distancia":0, "total":0}
        
        return render_template("resumen.html", valores=valores)

    if(request.method == "POST"):
        valores:dict = requests.get(f"http://localhost:8002/totem/calcular-pago?distancia={distancia}&vehicle_id={vehiculo}").json()
        
        data = session["reserva"]
        data["pago"] = valores
        session["reserva"] = data
        print(session["reserva"])

        return redirect(url_for("datos"))
    

@app.route("/opere-tarjeta", methods=["GET", "POST"])
def opere_tarjeta():
    if request.method == "POST":
        # Crear reserva
        requests.post("http://localhost:8002/totem/ingresar-reserva", json=session["reserva"])
        return redirect(url_for("imprimiendo"))
    return render_template("opere_tarjeta.html")

@app.route("/resultado-pago")
def resultado_pago():
    return render_template("resultado_pago.html")

@app.route("/imprimiendo")
def imprimiendo():
    return render_template("imprimiendo.html")

@app.route("/cancel")
def cancel():
    session["reserva"] = {}
    return redirect(url_for("inicio"))


if __name__ == "__main__":
    app.run(port=8000, debug=True)