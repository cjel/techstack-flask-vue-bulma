import os
from flask import Flask, jsonify, Blueprint, url_for, render_template
from flask_restx import Resource, Api, fields
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import DeclarativeBase

#class Base(DeclarativeBase):
#  pass

dir_path = os.path.dirname(os.path.realpath(__file__))

print(dir_path)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
  "mysql://user:password@localhost/database?unix_socket="
  + dir_path
  + "/run/mysqld.sock"
  )
#db.init_app(app)

blueprint = Blueprint('api', __name__, url_prefix='/api')
api = Api(blueprint, doc='/doc/')

app.register_blueprint(blueprint)

#assert url_for('api.doc') == '/api/doc/'


db = SQLAlchemy(app)
migrate = Migrate(app, db)

#api = Api(app)

parent = api.model('Parent', {
    'name': fields.String,
    'class': fields.String(discriminator=True)
    })

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

class TagModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

@api.route('/hello', endpoint='tag')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'fooobarchangedresult'}


@app.route("/")
def hello():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
