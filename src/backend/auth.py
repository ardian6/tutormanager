from random import randint
from DBFunctions import dblogin, dbregister, checkRegisterDuplicateEmail, checkRegisterDuplicateUsername

def login(username, password):
  """User logs in.
    Paramaters:
      username: String
      password: String
    Returns:
      session_token: String
  """
  # Below functions stores info on database
  token = randint(1, 10000)
  if dblogin(token, username, password) == True:
    return {
      'username' : username,
      'token': token
    }
  return None

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
    return "Invalid Username"
  if checkRegisterDuplicateEmail(email) is True:
    return "Invalid Email"
  token = randint(1, 1000)
  dbregister(token, email, username, password, firstName, lastName, userType.lower())
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