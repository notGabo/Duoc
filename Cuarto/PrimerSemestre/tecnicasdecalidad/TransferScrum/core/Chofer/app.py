from flask import Flask, flash, render_template, url_for, redirect, session, request
import requests
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html")

@app.route("/")
def principal():
    if(session.get("user") == None):
        return redirect(url_for("login"))
    
    render = render_template("principal.html")
    return render

@app.route("/login", methods=["GET", "POST"])
def login():
    if(request.method == "POST"):
        input_usuario = request.form.get("usuario")
        input_password = request.form.get("password")
        
        data:dict = requests.get(f"http://localhost:8002/chofer/obtener-chofer-por-email?chofer_email={input_usuario}&transfer=true").json()
        
        if(data == None):
            flash("Usuario o Contraseña Incorrectos", "error")
        else:
            # 4274268k Lawton Ickovits lickovits2@lulu.com
            # usuario = lickovits2@lulu.com
            # contraseña = 4274LI
            # contraseña = 4 primeros digitos de rut + iniciales Mayusculas
            true_password:str = data["run"][0:4] + data["nombres"][0].upper() + data["apellidos"][0].upper()

            if (true_password == input_password):
                session["user"] = data
                return redirect(url_for("principal"))
            else:
                flash("Usuario o Contraseña Incorrectos", "error")

    if(session.get("user") != None):
        return redirect(url_for("principal"))
    
    return render_template("login.html")

@app.route("/logout")
def logout():
    session["user"] = None
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(port=8001, debug=True)