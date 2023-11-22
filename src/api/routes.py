"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import bcrypt

api = Blueprint('api', __name__)
app=Flack(_name_)
bcrypt=Bcrypt(app)

# Allow CORS requests to this API
CORS(api)
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/singup', methods=['POST'])
def create_user():
   # print(request.get_json())
    email=request.json.get("email")
    password=request.json.get("password")
    secure_password=bcrypt.generate_password_hash(password,10).decode("utf-8")
    new_user=user()
    new_user.email=email
    new_user.password=secure_password
    new_user.is_active=True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg":"Usuario registrado"}),201
      


    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
    
    @api.route('/login', methods=['POST'])
def create_user():
   # print(request.get_json())
    email=request.json.get("email")
    password=request.json.get("password")
   
    user=User.query.filter_by(email=email).first()
  if user is None:
    return jsonify({"msg":"User not found"}),401

  if not bcrypt.check_password_hash(user.password, password):
      return jsonify({"msg":"Wrong password"}),401

  return jsonify({"msg":"Login successful"}),200

