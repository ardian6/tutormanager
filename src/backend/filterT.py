from DBFunctions import checkTokenExists, dbViewUsernameCourses, dbViewProfile, dbAllUsernames, dbGroupUsers

def filterTutors(token: str, course: str, location: str, timezone: str, rating: str) -> dict:
  """Filters tutors by given parameters.
    Paramaters:
      token: String,
      course: String,
      location: String,
      timezone: String,
      rating: String
    Returns:
      { 
        token: String,
        listofalldata: String[] 
      }
  """
  if not checkTokenExists(token):
    return {"error": "Token is invalid."}
  
  listOfAllUsers = dbAllUsernames()
  listofValidTutors = []

  for userN in listOfAllUsers:
    dictHolder = dbViewProfile(userN)
    if (dictHolder['userType'] == 'tutor'):
      if (location == '' or location == dictHolder['location']):
        if (timezone == '' or timezone == dictHolder['timezone']):
          # Do rating if statement in sprint 3
          courseList = dbViewUsernameCourses(dictHolder['username'])
          dictHolder['courseList'] = courseList
          if (course == '' or course in courseList):
            if (rating == '' or float(rating) <= float(dictHolder['averageRating'])):
              listofValidTutors.append(dictHolder)

  return {
    "token": token,
    "listofalldata": listofValidTutors
  }

def getUserGroups(token: str) -> dict:
  """Returns 3 lists for all users (Students, Tutors and Admins)
    Paramaters:
      token: String,
    Returns:
      { 
        token: String,
        studentList: String[],
        tutorList: String[],
        adminList: String[] 
      }
  """
  if not checkTokenExists(token):
    return {"error": "Token is invalid."}

  students, tutors, admins = dbGroupUsers()

  return {
    "token": token,
    "studentList": students,
    "tutorList": tutors,
    "adminList": admins
  }

if __name__ == '__main__':
    print(filterTutors('2', '', '', '', '5'))