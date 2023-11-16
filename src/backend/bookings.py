from DBFunctions import checkTokenExists, dbListAllBookings, dbListMyBookings, dbMakeBooking, dbDeleteBooking, dbCheckDuplicateBooking, dbAcceptBooking, dbListTargetBooking

def listAllBookings(session_token: str) -> dict:
  """Grabs all bookings in a list
    Paramaters:
      session_token: String

    Returns:
      { session_token: String,
        bookingsList: list }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllBookings = dbListAllBookings()

  return {
    "token": session_token,
    "bookingsList": listOfAllBookings
  }

def listMyBookings(session_token: str) -> dict:
  """Grabs all bookings related to the user
    Paramaters:
      session_token: String

    Returns:
      { session_token: String,
        bookingsList: list }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllBookings = dbListMyBookings(session_token)

  return {
    "token": session_token,
    "bookingsList": listOfAllBookings
  }

# Make a booking
def makeBooking(session_token: str, studentUser: str, tutorUser: str, 
                startTime: str, endTime: str, description: str) -> dict:
  """Student makes a booking with a tutor.
    Paramaters:
      session_token: String

    Returns:
      { session_token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # Check if booking between the two already exist
  if dbCheckDuplicateBooking(studentUser, tutorUser):
    return {"error": "Booking already exists."}
  
  dbMakeBooking(studentUser, tutorUser, startTime, endTime, description)

  return {
    "token": session_token
  }

def deleteBooking(session_token: str, studentUser: str, tutorUser: str) -> dict:
  """Student deletes their booking with selected tutor.
    Paramaters:
      session_token: String

    Returns:
      { token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # Check if booking between the two already exist
  if not dbCheckDuplicateBooking(studentUser, tutorUser):
    return {"error": "Booking doesn't exist."}

  dbDeleteBooking(studentUser, tutorUser)

  return {
    "token": session_token
  }

def acceptBooking(session_token: str, bookingID: str) -> dict:
  """An already created booking is accepted and updated in the database.
    Paramaters:
      session_token: String

    Returns:
      { token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  dbAcceptBooking(bookingID)

  return {
    "token": session_token
  }

def changeBooking(session_token: str, studentUser: str, tutorUser: str,
                  startTime: str, endTime: str, description: str) -> dict:
  """Student changes booking allocation with selected tutor.
    Paramaters:
      session_token: String

    Returns:
      { token: String }
  """
  deleteBooking(session_token, studentUser, tutorUser)
  makeBooking(session_token, studentUser, tutorUser, startTime, endTime, description)
  return {
    "token": session_token
  }

def listTargetBooking(session_token: str, targetProfile: str) -> dict:
  """Grabs all bookings related to the user
    Paramaters:
      session_token: String
      targetProfile: String

    Returns:
      { session_token: String,
        bookingsList: list }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllBookings = dbListTargetBooking(targetProfile)

  return {
    "token": session_token,
    "bookingsList": listOfAllBookings
  }

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(acceptBooking('2', '3'))