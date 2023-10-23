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

from auth import login, register, logout
from profile import changeUsername, changeEmail, changePassword, viewProfile, changeBio
from profile import addNewCourse, adminAddCourse, deleteCourse, deleteAccount, adminDelete, viewAllCourses, viewUserCourses, allUsers, allUsersData
from bookings import listAllBookings, listMyBookings, makeBooking, deleteBooking

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

""" 
ROUTES FOR AUTH FUNCTIONS

"""
# Auth Login Implementation to Server ##

@APP.route("/auth/login/", methods = ['POST'])
def auth_login():
    data = request.get_json()
    loginData = login(data['username'], data['password'])
    if (loginData['userType'] == ''):
        return {'error' : 'Invalid login credentials'}
    return dumps(loginData)

## Auth Register Implementation to Server ##

@APP.route("/auth/register/", methods = ['POST'])
def auth_register():
    data = request.get_json()
    loginData = register(data['email'], data['userName'], data['password'], data['firstName'], data['lastName'], data['userType'])
    return dumps(loginData)

## Auth Logout Implementation to Server ##

@APP.route("/auth/logout/", methods = ["POST"])
def logout_v1():
    data = request.get_json()
    logout(data['token'])
    return dumps({})

""" 
ROUTES FOR PROFILE FUNCTIONS

"""

## User Profile Implementation to Server ##

@APP.route("/profile/view", methods = ['GET'])
def user_profile_view():
    username = request.args.get('username')
    return dumps(viewProfile(username))

## User Profile Change Username Implementation to Server ##

@APP.route("/profile/change-username", methods = ['PUT'])
def change_username():
    data = request.get_json()
    return dumps(changeUsername(data['token'], data['newUsername']))

## User Profile Change Password Implementation to Server ##

@APP.route("/profile/change-password", methods = ['PUT'])
def change_password():
    data = request.get_json()
    return dumps(changePassword(data['token'], data['newPassword']))

## User Profile Change Email Implementation to Server ##

@APP.route("/profile/change-email", methods = ['PUT'])
def change_email():
    data = request.get_json()
    return dumps(changeEmail(data['token'], data['newEmail']))

## User Profile Change Bio Implementation to Server ##

@APP.route("/profile/change-bio", methods = ['PUT'])
def change_bio():
    data = request.get_json()
    return dumps(changeBio(data['token'], data['newBio']))

## User Profile Add New Course Implementation to Server ##

@APP.route("/profile/add-course", methods = ['PUT'])
def add_course():
    data = request.get_json()
    return dumps(addNewCourse(data['token'], data['newCourse']))

# ## User Profile Admin Add Course Implementation to Server ##

@APP.route("/profile/admin-add-course", methods = ['PUT'])
def admin_add_course():
    data = request.get_json()
    return dumps(adminAddCourse(data['token'], data['newCourse']))

## User Profile Delete Course Implementation to Server ##

@APP.route("/profile/delete-course", methods = ['PUT'])
def delete_course():
    data = request.get_json()
    return dumps(deleteCourse(data['token'], data['courseToBeDeleted']))

## User Profile View All Courses Implementation to Server ##

@APP.route("/profile/view-all-courses", methods = ['POST'])
def view_all_courses():
    data = request.get_json()
    return dumps(viewAllCourses(data['token']))

## User Profile View My Courses Implementation to Server ##

@APP.route("/profile/view-my-courses", methods = ['GET'])
def view_my_courses():
    token = request.args.get('token')
    return dumps(viewUserCourses(token))

## User Profile Delete Account Implementation to Server ##

@APP.route("/profile/delete-account", methods = ['PUT'])
def delete_account():
    data = request.get_json()
    return dumps(deleteAccount(data['token'], data['password']))

## User Profile Delete Account Implementation to Server ##

@APP.route("/profile/admin-delete", methods = ['PUT'])
def admin_delete():
    data = request.get_json()
    return dumps(adminDelete(data['token'], data['targetProfile']['user']))

## User Profile View All Users Implementation to Server ##

@APP.route("/profile/view-all-users", methods = ['POST'])
def view_all_Users():
    data = request.get_json()
    return dumps(allUsers(data['token']))

## User Profile View All Users Meta Data Implementation to Server ##

@APP.route("/profile/view-all-users-data", methods = ['POST'])
def view_all_UsersData():
    data = request.get_json()
    return dumps(allUsersData(data['token']))

""" 
ROUTES FOR Booking FUNCTIONS

"""
## User booking View All bookings Implementation to Server ##

@APP.route("/bookings/view-all-bookings", methods = ['POST'])
def view_all_bookings():
    data = request.get_json()
    return dumps(listAllBookings(data['token']))

## User booking View my bookings Implementation to Server ##

@APP.route("/bookings/view-my-bookings", methods = ['POST'])
def view_my_bookings():
    data = request.get_json()
    return dumps(listMyBookings(data['token']))

## User booking make booking Implementation to Server ##

@APP.route("/booking/make-booking", methods = ['PUT'])
def view_create_bookings():
    data = request.get_json()
    # studentUser and tutorUser are just the usernames while startTime and endTime is a string in this format '%Y-%m-%d %H:%M:%S'
    return dumps(makeBooking(data['token'], data['studentUser'], data['tutorUser'], data['startTime'], data['endTime'], data['description']))

## User booking delete booking Implementation to Server ##

@APP.route("/booking/delete-booking", methods = ['PUT'])
def view_delete_bookings():
    data = request.get_json()
    return dumps(deleteBooking(data['token'], data['studentUser'], data['tutorUser']))

""" 
END OF ROUTES

"""

### NO NEED TO MODIFY BELOW THIS POINT
if __name__ == "__main__":
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=5005) # Do not edit this port
