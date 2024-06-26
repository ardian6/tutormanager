from DBFunctions import dblogin, dbregister, checkDuplicateEmail, checkDuplicateUsername, dblogout
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
  encryptedPassword = getHashOf(password)
  token = jwt.encode({'username' : username, 'password': encryptedPassword}, SECRET,  algorithm = 'HS256')

  # Below functions stores info on database
  userType = dblogin(token, username, encryptedPassword)
  return {
    'username': username,
    'token': token,
    'userType': userType
  }

def register(email: str, username: str, password: str, firstName: str, 
             lastName: str, userType: str) -> dict:
  """User provides credentials to register.
    Paramaters:
      email: String
      username: String
      password: String
      firstName: String
      lastName: String
      userType: String
    Returns:
      { session_token: String }
  """
  # Below functions stores info on database
  if checkDuplicateUsername(username) is True:
    return {'error' : 'Email is already in use.'}
  if checkDuplicateEmail(email) is True:
    return {'error' : 'Email is already in use.'}

  encryptedPassword = getHashOf(password)
  token = jwt.encode({'email' : email, 'username' : username,'password': encryptedPassword,
                      'first name': firstName, 'last name': lastName, 'user type': userType}, 
                      SECRET,  algorithm = 'HS256')


  dbregister(token, email, username, encryptedPassword, firstName, lastName, userType.lower())
  
  return {
    'username' : username,
    'token': token
  }

def logout(token: str) -> dict:
  """User logs out
    Paramaters:
      token: String
    Returns:
      { session_token: String }
  """
  dblogout(token)
  return {
    "token": token
  }


if __name__ == '__main__':
  login("username1","password1")