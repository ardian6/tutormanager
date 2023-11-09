from DBFunctions import checkTokenExists, dbViewUsernameCourses, dbViewProfile, dbAllUsernames, dbGroupUsers

def filterTutors(session_token, course, location, timezone, rating):
  if not checkTokenExists(session_token):
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
    "token": session_token,
    "listofalldata": listofValidTutors
  }

def getUserGroups(session_token: str):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}

  students, tutors, admins = dbGroupUsers()

  return {
    "token": session_token,
    "studentList": students,
    "tutorList": tutors,
    "adminList": admins
  }

if __name__ == '__main__':
    print(filterTutors('2', '', '', '', '5'))