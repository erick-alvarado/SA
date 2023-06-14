import logging
from flask import Flask, make_response
import requests

app = Flask(__name__)

# Configurar el logger para guardar los mensajes en un archivo
logging.basicConfig(filename='server.log', level=logging.INFO)
logger = logging.getLogger()

restaurante_url = 'http://localhost:5001'  # URL de la API del restaurante
repartidor_url = 'http://localhost:5002'  # URL de la API del repartidor

@app.route('/solicitar_pedido_restaurante', methods=['POST'])
def solicitar_pedido_restaurante():
    response = make_response("Pedido solicitado al restaurante")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al restaurante
    requests.post(f'{restaurante_url}/recibir_pedido')

    return response

@app.route('/verificar_estado_pedido_restaurante', methods=['GET'])
def verificar_estado_pedido_restaurante():
    response = make_response("Estado del pedido al restaurante: Pendiente")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al restaurante
    requests.get(f'{restaurante_url}/informar_estado_pedido')

    return response

@app.route('/verificar_estado_pedido_repartidor', methods=['GET'])
def verificar_estado_pedido_repartidor():
    response = make_response("Estado del pedido al repartidor: En camino")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al repartidor
    requests.get(f'{repartidor_url}/informar_estado_pedido')

    return response
@app.route('/avisar_repartidor', methods=['POST'])
def avisar_repartidor():
    response = make_response("Repartidor notificado")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al repartidor a través del ESB
    requests.post(f'{repartidor_url}/recibir_pedido')

    return response
if __name__ == '__main__':
    app.run(port=5003)