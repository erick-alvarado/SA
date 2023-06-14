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
    return "Estado del pedido: En camino"

@app.route('/marcar_entregado', methods=['POST'])
def marcar_entregado():
    return "Pedido marcado como entregado"

if __name__ == '__main__':
    app.run(port=5002)
