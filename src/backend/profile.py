from DBFunctions import checkRegisterDuplicateUsername, checkRegisterDuplicateEmail

listOfAllCourses = ["Maths", "English"]

def changeUsername(session_token: str, newUsername: str) -> dict:
  """Changes a given user's username.
    Paramaters:
      session_token: String
      newUsername: String

    Returns:
      { session_token: String }
  """
  # Verify token validity
  
  # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # Check if new username is valid -> if true then raise error else proceed
  if not checkRegisterDuplicateUsername(newUsername): return "This username is already in use!"
  
  # This function actually goes into the database and changes the data stored
  dbChangeUsername(session_token, newUsername) 

  return {
    "token": session_token
  }

def changeEmail(session_token: str, newEmail: str) -> dict:
  """Changes a given user's email.
    Paramaters:
      session_token: String
      newEmail: String
    Returns:
      session_token: String
  """
  # Verify token validity

  # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # Check if new email is already in use, if it is stop here else proceed
  if not checkRegisterDuplicateEmail(newEmail): return "This email is already in use!"
  
  # This function actually goes into the database and changes the data stored
  dbChangeEmail(session_token, newEmail) 

  return {
    "token": session_token
  }

def changePassword(session_token: str, newPassword: str) -> dict:
  """Changes a given user's password.
    Paramaters:
      session_token: String
      newPassword: String
    Returns:
      { session_token: String }
  """
  # Verify token validity

  # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # This function actually goes into the database and changes the data stored
  dbChangePassword(session_token, newPassword) 

  return {
    "token": session_token
  }

def changeBio(session_token: str, newBio: str) -> dict:
  """Changes a given user's bio.
    Paramaters:
      session_token: String
      newBio: String
    Returns:
      { session_token: String }
  """
  # Verify token validity

   # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # This function actually goes into the database and changes the data stored
  dbChangeBio(session_token, newBio) 

  return {
    "token": session_token
  }

def addNewCourse(session_token: str, newCourse: str) -> dict:
  """Adds a course to the given user's courses.
    Paramaters:
      session_token: String
      courses: String[]
      newCourse: String
    Returns:
      { session_token: String }
  """
  # Verify token validity

   # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # Check if course added is valid from the listOfAllCourses 
  # If failed stop here

  # This function actually goes into the database and changes the data stored
  dbAddCourse(session_token, newCourse) # This function returns True if successful or false if failed


  return {
    "token": session_token
  }

# Admins are allowed to add new courses to the list
def adminAddCourse (newCourse):
  # Check if it exists already then Add a new course to the listOfAllCourses
  return


def deleteCourse(session_token: str, courseToBeDeleted: str) -> dict:
  """Deletes a course from a given user.
    Paramaters:
      session_token: String
      courses: String[]
      courseToBeDeleted: String
    Returns:
      { session_token: String }
  """
  # Verify token validity

   # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # This function actually goes into the database and changes the data stored
  dbDeleteCourse(session_token, courseToBeDeleted) # This function returns True if successful or false if failed
  # Get users course list
    # Check if courseToBeDeleted is in user's course list
      # If yes: remove that course from list and update DB
      # If no:
        # add it to user's course list and update DB
  return {
    "token": session_token
  }

def deleteAccount(session_token: list, password: str) -> dict:
  """Deletes the given user's account.
    Paramaters:
      session_token: String
      password: String
    Returns:
      { session_token: String }
  """

  # Verify token validity

  # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # This function actually goes into the database and changes the data stored
  dbDeleteAccount(session_token, password) # This function returns True if successful or false if failed

  return {
    "token": session_token
  }

def viewProfile(session_token: str, targetProfile: str) -> dict:
  """Current user views target user's profile.
    Paramaters:
      session_token: String
      targetProfile: String
    Returns:
      { session_token: String }
  """
  # Verify token validity

  # Find user in database from token
  checkTokenExists(session_token) # -> if true it means proceed if false stop here

  # Find user in database from token

  # This function actually goes into the database and retrieves the information wanted
  dbViewProfile(targetProfile) # This function returns the information wanted in a dictionary

  return {
    "token": session_token
  }

def adminDelete(session_token: str, targetProfile: str) -> dict:
  """Admin user deletes the target user.
    Paramaters:
      session_token: String
      targetProfile: String
    Returns:
      { session_token: String }
  """
  # Verify token validity
  # Find user in database from token and check if admin
  checkTokenAdmin(session_token) # -> if true it means proceed if false stop here

  # Find user in database from targetProfile

  # Delete user associated with targetProfile from DB
  dbAdminDelete(targetProfile)
  # (Admin has extra privileges so should delete targetProfile without any checks)
  # Can do additional check to see if user is correctly deleted

  return {
    "token": session_token
  }

# def uploadDocumentation(session_token)
#   return
