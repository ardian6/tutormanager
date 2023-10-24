from DBFunctions import checkTokenExists, dbListAllBookings, dbListMyBookings, dbMakeBooking, dbDeleteBooking, dbCheckDuplicateBooking, getUsername, dbAcceptBooking

# Grabs all bookings in a list
def listAllBookings(session_token):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllBookings = dbListAllBookings()

  return {
    "token": session_token,
    "bookingsList": listOfAllBookings
  }

# Grabs all bookings related to the user
def listMyBookings(session_token):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllBookings = dbListMyBookings(session_token)

  return {
    "token": session_token,
    "bookingsList": listOfAllBookings
  }

# Make a booking
def makeBooking(session_token, sUser, tUser, sTime, eTime, description):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # Check if booking between the two already exist
  if dbCheckDuplicateBooking(sUser, tUser):
    return {"error": "Booking already exists."}
  
  dbMakeBooking(sUser, tUser, sTime, eTime, description)

  return {
    "token": session_token
  }

# Delete a booking
def deleteBooking(session_token, sUser, tUser):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # Check if booking between the two already exist
  if not dbCheckDuplicateBooking(sUser, tUser):
    return {"error": "Booking doesn't exists."}

  dbDeleteBooking(sUser, tUser)

  return {
    "token": session_token
  }

# Accept a booking
def acceptBooking(session_token, bookingID):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  dbAcceptBooking(bookingID)

  return {
    "token": session_token
  }

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(acceptBooking('2', '3'))