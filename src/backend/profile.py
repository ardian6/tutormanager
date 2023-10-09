from DBFunctions import checkRegisterDuplicateUsername, checkRegisterDuplicateEmail

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
    # If user cannot be found it means at some point after logging in, their token became invalid

  # After finding user:
    # Check if newUsername is unique (call DB function)
      # If unique ---> Update user's username in DB
      # If NOT unique ---> return "This username is already in use!"

  if not checkRegisterDuplicateUsername(newUsername): return "This username is already in use!"

  # user.username = newUsername
  # updateDB(user)


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
    # If user cannot be found it means at some point after logging in, their token became invalid

  # After finding user:
    # Check if email is unique (call DB function)
      # If unique ---> Update user's email in DB (literally user_curr_email = newEmail)
      # If NOT unique ---> return "This email is already in use!"

  if not checkRegisterDuplicateEmail(newEmail): return "This email is already in use!"

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
    # If user cannot be found it means at some point after logging in, their token became invalid

  # After finding user:
    # Check if newPassword is the same as old password???
      # If NOT the same ---> Update user's password in DB
      # If the same ---> return "Your new password can't be your old password!"

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

  # After finding user:
    # Just update bio in DB (curr_bio = neBio)
      # Bio can be empty if user wants so should be fine

  return {
    "token": session_token
  }

def addNewCourse(session_token: str, courses: list, newCourse: str) -> dict:
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

  # Get users course list
    # Check if newCourse is in user's course list
      # If yes: return "You are already enrolled in this course."
      # If no:
        # add it to user's course list and update DB

  return {
    "token": session_token
  }

def deleteCourse(session_token: str, courses: list, courseToBeDeleted: str) -> dict:
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
  # Confirm if the user's password is equal to 'password' variable
    # If no:
      # return "Password is incorrect."
    # else:
      # Delete account from database, including session_token?


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

  # Find user in database from targetProfile

  # Delete user associated with targetProfile from DB
  # (Admin has extra priviliges so should delete targetProfile without any checks)
  # Can do additional check to see if user is correctly deleted

  return {
    "token": session_token
  }

# def uploadDocumentation(session_token)
#   return
