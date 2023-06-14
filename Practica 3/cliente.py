import logging
import requests
from flask import Flask, make_response

app = Flask(__name__)

# Configurar el logger para guardar los mensajes en un archivo
logging.basicConfig(filename='server.log', level=logging.INFO)
logger = logging.getLogger()

@app.route('/solicitar_pedido', methods=['POST'])
def solicitar_pedido():
    response = make_response("Pedido solicitado al restaurante")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al restaurante
    requests.post('http://localhost:5001/recibir_pedido')

    return response

@app.route('/verificar_estado_pedido_restaurante', methods=['GET'])
def verificar_estado_pedido_restaurante():
    response = make_response("Pedido solicitado al restaurante")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al restaurante
    requests.post('http://localhost:5001/informar_estado_pedido')
    return "Estado del pedido al restaurante: Pendiente"

@app.route('/verificar_estado_pedido_repartidor', methods=['GET'])
def verificar_estado_pedido_repartidor():
    response = make_response("Pedido solicitado al restaurante")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al restaurante
    requests.post('http://localhost:5002/informar_estado_pedido')
    
    return "Estado del pedido al repartidor: En camino"

if __name__ == '__main__':
    app.run(port=5000)
