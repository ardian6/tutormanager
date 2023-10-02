import sys
import signal
import token
import jwt
from json import dumps
from src.other import clear_v1
from flask import Flask, request, redirect
from flask import send_from_directory
#from flask_mail import Mail, Message
from flask_cors import CORS

from PIL import Image
#from src.echo import echo


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

# Example
# @APP.route("/echo", methods = ['GET'])
# def echo():
#     data = request.args.get('data')
#     if data == 'echo':
#    	    raise InputError(description = 'Cannot echo "echo"')

#     return dumps({'data': data})



# Auth Login Implementation to Server ##

# @APP.route("/auth/login/", methods = ['POST'])
# def auth_login_v2():
    # load()
    # data = request.get_json()
    # user_id = auth_login_v1(data['email'],
    # data['password'])

    # encoded_token = generate_token(user_id)
    # result = {'token' : encoded_token, 'auth_user_id' : user_id['auth_user_id']}
    # save()
    # return dumps(result)

## Auth Register Implementation to Server ##

# @APP.route("/auth/register/", methods = ['POST'])
# def auth_login_v2():
    # load()
    # data = request.get_json()
    # user_id = auth_login_v1(data['email'],
    # data['password'])

    # encoded_token = generate_token(user_id)
    # result = {'token' : encoded_token, 'auth_user_id' : user_id['auth_user_id']}
    # save()
    # return dumps(result)

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
# if __name__ == "__main__":
#     signal.signal(signal.SIGINT, quit_gracefully) # For coverage
#     APP.run(port=config.port) # Do not edit this port

# 400 bad request,
# 200 good request,
# 401 authorised error,
# 403 forbidden,
# 404 not found
