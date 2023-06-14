import requests
import logging
from flask import Flask, make_response

app = Flask(__name__)

# Configurar el logger para guardar los mensajes en un archivo
logging.basicConfig(filename='server.log', level=logging.INFO)
logger = logging.getLogger()

@app.route('/recibir_pedido', methods=['POST'])
def recibir_pedido():
    return "Pedido recibido correctamente"

@app.route('/informar_estado_pedido', methods=['GET'])
def informar_estado_pedido():
    return "Estado del pedido: En proceso"

@app.route('/avisar_repartidor', methods=['POST'])
def avisar_repartidor():
    response = make_response("Pedido solicitado al restaurante")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al restaurante
    requests.post('http://localhost:5002/recibir_pedido')
    return "Repartidor notificado"

if __name__ == '__main__':
    app.run(port=5001)
