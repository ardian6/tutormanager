import sys
import signal
import token
import jwt
from json import dumps
from flask import Flask, request, redirect
from flask import send_from_directory
#from flask_mail import Mail, Message
from flask_cors import CORS
#from src.echo import echo

from auth import login, register


def quit_gracefully(*args):
    '''For coverage'''
    exit(0)

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__, static_url_path='/images/')
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

#### NO NEED TO MODIFY ABOVE THIS POINT, EXCEPT IMPORTS

# Auth Login Implementation to Server ##

@APP.route("/auth/login/", methods = ['POST'])
def auth_login():
    data = request.get_json()
    loginData = login(data['email'], data['password'])

    # encoded_token = generate_token(user_id)
    result = {'token' : loginData['token'], 'username' : loginData['username']}
    return dumps(result)

## Auth Register Implementation to Server ##

@APP.route("/auth/register/", methods = ['POST'])
def auth_register():
    data = request.get_json()
    loginData = register(data['email'], data['userName'], data['password'], data['firstName'], data['lastName'], data['userType'])

    # encoded_token = generate_token(user_id)
    result = None
    if loginData:
        result = {'token' : loginData['token'], 'username' : loginData['username']}
    
    return dumps(result)

## Auth Register Implementation to Server ##

# @APP.route("/auth/logout/", methods = ['POST'])
# def auth_login_v2():
    # load()
    # data = request.get_json()
    # user_id = auth_login_v1(data['email'],
    # data['password'])

    # encoded_token = generate_token(user_id)
    # result = {'token' : encoded_token, 'auth_user_id' : user_id['auth_user_id']}
    # save()
    # return dumps(result)

# @APP.route("/auth/profile/", methods = ['POST'])
# def auth_login_v2():
    # load()
    # data = request.get_json()
    # user_id = auth_login_v1(data['email'],
    # data['password'])

    # encoded_token = generate_token(user_id)
    # result = {'token' : encoded_token, 'auth_user_id' : user_id['auth_user_id']}
    # save()
    # return dumps(result)

# @APP.route("/auth/logout/v1", methods = ["POST"])
# def logout_v1():
#     load()
#     data = request.get_json()
#     auth_logout(data['token'])
#     save()
#     return dumps({})

## Auth Register Implementation to Server ##


### NO NEED TO MODIFY BELOW THIS POINT
if __name__ == "__main__":
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=5005) # Do not edit this port

# 400 bad request,
# 200 good request,
# 401 authorised error,
# 403 forbidden,
# 404 not found
