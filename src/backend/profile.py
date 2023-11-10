from DBFunctions import checkTokenExists, checkDuplicateEmail, checkDuplicateUsername, checkTokenAdmin, dbAdminChangePassword, dbRemoveCourseFromList
from DBFunctions import dbChangeUsername, dbChangePassword, dbChangeEmail, dbChangeBio, dbAddCourse
from DBFunctions import dbDeleteAccount, dbAdminDelete, dbDeleteCourse, dbViewProfile, dbCourseList, dbAddCourseToList, dbViewMyCourses, dbAllUsernames
from helper import getHashOf
from DBFunctions import dbUploadDoc, dbChangeProfilePic, dbChangeYTLink, dbAdminApprove

def changeUsername(session_token: str, newUsername: str) -> dict:
  """Changes a given user's username.
    Paramaters:
      session_token: String
      newUsername: String

    Returns:
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # Check if new username is valid -> if true then raise error else proceed
  if checkDuplicateUsername(newUsername): return {"error": "Username is invalid."}
  
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
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  # Check if new email is already in use, if it is stop here else proceed
  if checkDuplicateEmail(newEmail): 
    return {"error": "Email is invalid."}
  
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
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  dbChangePassword(session_token, getHashOf(newPassword)) 

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
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  dbChangeBio(session_token, newBio) 

  return {
    "token": session_token
  }

def addNewCourse(session_token: str, newCourse: str) -> dict:
  """Adds a course to the given user's courses.
    Paramaters:
      session_token: String
      newCourse: String
    Returns:
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  # Check if course added is valid from the list Of all courses retrieved from the database
  if newCourse.lower() not in dbCourseList(): 
    return {"error": "Course is not in the valid course list."}

  checkValid = dbAddCourse(session_token, newCourse.lower())

  if checkValid is False:
    return {"error": 'Invalid course addition because you already added the course'}

  return {
    "token": session_token
  }

def adminAddCourse(session_token: str, newCourse: str) -> dict:
  """Admin user adds a course to the TutorManager course list.
    Paramaters:
      session_token: String
      newCourse: String
    Returns:
      {}
  """
  # Check if user is an admin/in database
  if not checkTokenAdmin(session_token):
    return {"error": "Admin token is invalid."}
  
  if newCourse.lower() not in dbCourseList(): 
    dbAddCourseToList(newCourse.lower())
    return {}

  return {"error": "Course is already in the course list."}

def adminDeleteCourse(session_token: str, courseName: str) -> dict:
  """Admin user adds a course to the TutorManager course list.
    Paramaters:
      session_token: String
      courseName: String
    Returns:
      {}
  """
  # Check if user is an admin/in database
  if not checkTokenAdmin(session_token):
    return {"error": "Admin token is invalid."}
  
  if courseName.lower() in dbCourseList(): 
    dbRemoveCourseFromList(courseName.lower())
    return {}
  
  return {"error": "Course is not in the course list."}

def deleteCourse(session_token: str, courseToBeDeleted: str) -> dict:
  """Deletes a course from a given user.
    Paramaters:
      session_token: String
      courses: String[]
      courseToBeDeleted: String
    Returns:
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  # Calls the database delete course function
  checkValid = dbDeleteCourse(session_token, courseToBeDeleted.lower())
  
  if checkValid is False:
    return {"error": 'Invalid course deletion because you have not previously added the course'}
  
  return {
    "token": session_token
  }

def viewAllCourses(session_token: str) -> dict:
  """User views all the avaliable courses.
    Paramaters:
      session_token: String
    Returns:
      { session_token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllCourses = dbCourseList()

  return {
    "token": session_token,
    "listcourses": listOfAllCourses
  }

def viewUserCourses(session_token: str) -> dict:
  """User views their ENROLLED courses
    Paramaters:
      session_token: String
    Returns:
      { token: String, myCourses: String[] }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  listOfMyCourses = dbViewMyCourses(session_token)

  return {
    "token": session_token,
    'myCourses': listOfMyCourses
  }

def deleteAccount(session_token: str, password: str) -> dict:
  """Deletes the given user's account.
    Paramaters:
      session_token: String
      password: String
    Returns:
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  dbDeleteAccount(session_token, getHashOf(password))

  return {
    "token": session_token
  }

def viewProfile(targetProfile: str) -> dict:
  """Current user views target user's profile.
    Paramaters:
      targetProfile: String
    Returns:
      {
        'username': allData[0],
        'email': allData[1],
        'givenName': allData[2],
        'familyName': allData[3],
        'userType': allData[4],
        'bio': allData[5],
        'location': allData[6],
        'phone': allData[7],
        'timezone': allData[8],
    }
  """
  return dbViewProfile(targetProfile)

def adminDelete(session_token: str, targetProfile: str) -> dict:
  """Admin user deletes the target user.
    Paramaters:
      session_token: String
      targetProfile: String
    Returns:
      { session_token: String }
  """
  # Find user in database from token and check if admin
  if not checkTokenAdmin(session_token):
    return {"error": "Admin token is invalid."}

  # Delete user associated with targetProfile from DB
  dbAdminDelete(targetProfile)

  return {
    "token": session_token
  }

def allUsers(session_token: str) -> dict:
  """Returns all users.
    Paramaters:
      session_token: String
    Returns:
      { token: String, usersList: String[] }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllUsers = dbAllUsernames()

  return {
    "token": session_token,
    "usersList": listOfAllUsers
  }

def allUsersData(session_token: str) -> dict:
  """Retrieves the data of all users
    Paramaters:
      session_token: String
      targetProfile: String
    Returns:
      { session_token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllUsers = dbAllUsernames()
  listofallData = []
  for userN in listOfAllUsers:
    listofallData.append(dbViewProfile(userN))
  
  return {
    "token": session_token,
    "listofalldata": listofallData
  }

def adminChangePassword(session_token: str, targetProfile: str, newPassword: str) -> dict:
  """Retrieves the data of all users
    Paramaters:
      session_token: String
      targetProfile: String
    Returns:
      { session_token: String }
  """
  if not checkTokenAdmin(session_token):
    return {"error": "Admin token is invalid."}
  
  dbAdminChangePassword(targetProfile, getHashOf(newPassword)) 

  return {
    "token": session_token,
  }

def uploadDocumentation(session_token: str, pdfDataStr: str):
  """Stores the data for a PDF
    Paramaters:
      session_token: String
      pdfDataStr: String
    Returns:
      { session_token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  dbUploadDoc(session_token, pdfDataStr)

  return {
    "token": session_token,
  }

def changePicture(session_token: str, pictureString: str) -> dict:
  """Changes a given user's profile picture.
    Paramaters:
      session_token: String
      pictureString: String

    Returns:
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # This function actually goes into the database and changes the data stored
  dbChangeProfilePic(session_token, pictureString)

  return {
    "token": session_token
  }

def changeYTLink(session_token: str, link: str) -> dict:
  """Changes a given user's youtube video.
    Paramaters:
      session_token: String
      link: String

    Returns:
      { session_token: String }
  """
  # Find user in database from token
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # This function actually goes into the database and changes the data stored
  dbChangeYTLink(session_token, link)

  return {
    "token": session_token
  }

def adminApprove(session_token: str, targetProfile: str) -> dict:
  """Admin user deletes the target user.
    Paramaters:
      session_token: String
      targetProfile: String
    Returns:
      { session_token: String }
  """
  # Find user in database from token and check if admin
  if not checkTokenAdmin(session_token):
    return {"error": "Admin token is invalid."}

  # Approve the targeted user in the database
  dbAdminApprove(targetProfile)

  return {
    "token": session_token
  }

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(deleteAccount('3', 'password4'))
