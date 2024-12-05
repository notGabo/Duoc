from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():

    lista = ['PHP', 'HTML5', 'Swift', 'Java', 'TypeScript']
    
    data = {
        'titulo':'APP WEB TEST',
        'texto':'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis rem iste expedita in sequi dolorum, sint debitis quisquam. Error, odio non. Omnis excepturi nam voluptatum ipsam, possimus eos facilis ipsum!',
        'lista': lista,
        'lista_len': len(lista)
    }

    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=80)
