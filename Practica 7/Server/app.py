from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@db/db_name'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    carnet = db.Column(db.String(10))

@app.route('/')
def get_users():
    users = User.query.all()
    result = []
    for user in users:
        result.append({'nombre': user.nombre, 'carnet': user.carnet})
    return {'users': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
