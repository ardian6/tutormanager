import DBFunctions

def login(username, password):
  """User logs in.
    Paramaters:
      username: String
      password: String
    Returns:
      session_token: String
  """
  # Below functions stores info on database
  token = "abc"
  print(DBFunctions.dblogin(token, username, password))
  return

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
  dbregister(token, email, username, password, firstName, lastName, userType)
  return

def logout(token):
  # Below functions stores info on database
  dblogout(token)
  return


# if __name__ == '__main__':
#   login("test1","test2")