from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
urlGet = 'https://official-joke-api.appspot.com/random_joke'
urlPost = 'https://api.mathjs.org/v4/'

@app.route('/', methods=['GET'])
def get_data():
    response = requests.get(urlGet)
    data = response.json()
    return jsonify(data)

@app.route('/', methods=['POST'])
def post_data():
    data = request.get_json()
    response = requests.post(urlPost, json=data)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run()