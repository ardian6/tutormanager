from DBFunctions import checkTokenExists, dbMakeRating, dbTutorRatings, dbAverageRatings

def makeRatings(session_token: str, stuUser: str, tutUser: str, numberRate: float, reviewRate: str) -> dict:
  """The student user makes a rating about the tutor user
    Paramaters:
      session_token: String

    Returns:
      { session_token: String}
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  checker = dbMakeRating(stuUser, tutUser, numberRate, reviewRate)
  if checker == False:
    return {"error": "Must have a previous session completed with tutor before you can review"}

  return {
    "token": session_token
  }

def tutorWrittenRatings(session_token: str, tutUser: str) -> dict:
  """Returns all the ratings about a specific tutor
    Paramaters:
      session_token: String

    Returns:
      { session_token: String,
      allRatingsTutor: list}
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfRatings = dbTutorRatings(tutUser)

  return {
    "token": session_token,
    "allRatingsTutor": listOfRatings
  }

def tutorAverageRatings(session_token: str, tutUser: str) -> dict:
  """Returns the average ratings about a specific tutor
    Paramaters:
      session_token: String

    Returns:
      { session_token: String,
      averageRating: float}
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  averageRate = dbAverageRatings(tutUser)

  return {
    "token": session_token,
    "averageRating": averageRate
  }

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(tutorAverageRatings('2', 'username6'))