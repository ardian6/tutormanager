from random import randint
from DBFunctions import dblogin, dbregister, checkRegisterDuplicateEmail, checkRegisterDuplicateUsername
import hashlib

def login(username: str, password: str) -> str:
  """User logs in.
    Paramaters:
      username: String
      password: String
    Returns:
      session_token: String
  """
  # TODO: Create token with jwt module

  # Below functions stores info on database
  token = randint(1, 10000)
  if dblogin(token, username, password) == True:
    return {
      'username' : username,
      'token': token
    }
  return {"error": "Invalid username or password" }

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
  # TODO: Create token with jwt module
  
  # TODO: Encode password
  encrypted_pass = hashlib.sha256(password.encode()).hexdigest()

  # Below functions stores info on database
  if checkRegisterDuplicateUsername(username) is True:
    return {"error": "Invalid Username"}
    # raise Exception("Invalid Username")
  if checkRegisterDuplicateEmail(email) is True:
    return {"error": "Invalid Email"}
    # raise Exception("Invalid Email")
  token = randint(1, 1000)
  dbregister(token, email, username, encrypted_pass, firstName, lastName, userType.lower())
  return {
    'username' : username,
    'token': token
  }

def logout(token):
  # Below functions stores info on database
  dblogout(token)
  return


# if __name__ == '__main__':
#   login("test1","test2")