from urllib.error import HTTPError
from DBFunctions import dblogin, dbregister, checkRegisterDuplicateEmail, checkRegisterDuplicateUsername, dblogout
import jwt
from helper import getHashOf, SECRET

def login(username: str, password: str) -> dict:
  """User logs in.
    Paramaters:
      username: String
      password: String
    Returns:
      session_token: String
  """
  token = jwt.encode({'username' : username, 'password': password}, SECRET,  algorithm = 'HS256')
  encryptedPassword = getHashOf(password)

  # Below functions stores info on database
  userType = dblogin(token, username, encryptedPassword)
  return {
    'username': username,
    'token': token,
    'userType': userType
  }

def register(email, username, password, firstName, lastName, userType):
  """User provides credentials to register.
    Paramaters:
      email: String
      username: String
      password: String
      firstName: String
      lastName: String
      userType: String
    Returns:
      session_token: String
  """
  # Below functions stores info on database
  if checkRegisterDuplicateUsername(username) is True:
    return {'error' : 'Username in use'}
  if checkRegisterDuplicateEmail(email) is True:
    return {'error' : 'Email in use'}

  encryptedPassword = getHashOf(password)
  token = jwt.encode({'email' : email, 'username' : username,'password': encryptedPassword,
                      'first name': firstName, 'last name': lastName, 'user type': userType}, 
                      SECRET,  algorithm = 'HS256')


  dbregister(token, email, username, encryptedPassword, firstName, lastName, userType.lower())
  
  return {
    'username' : username,
    'token': token
  }

def logout(token):
  # Below functions stores info on database
  dblogout(token)
  return {
    "token": token
  }


if __name__ == '__main__':
  login("username1","password1")