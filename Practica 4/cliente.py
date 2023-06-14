import logging
import requests
from flask import Flask, make_response

app = Flask(__name__)

# Configurar el logger para guardar los mensajes en un archivo
logging.basicConfig(filename='server.log', level=logging.INFO)
logger = logging.getLogger()

esb_url = 'http://localhost:5003'  # URL de la API intermediaria (ESB)

@app.route('/solicitar_pedido', methods=['POST'])
def solicitar_pedido():
    response = make_response("Pedido solicitado al restaurante")
    response.status_code = 200
    response.content_type = 'text/plain'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Max-Age"] = "86400"

    # Enviar solicitud al ESB para solicitar pedido al restaurante
    requests.post(f'{esb_url}/solicitar_pedido_restaurante')

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

    # Enviar solicitud al ESB para verificar estado del pedido al restaurante
    requests.get(f'{esb_url}/verificar_estado_pedido_restaurante')

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

    # Enviar solicitud al ESB para verificar estado del pedido al repartidor
    requests.get(f'{esb_url}/verificar_estado_pedido_repartidor')

    return response

if __name__ == '__main__':
    app.run(port=5000)