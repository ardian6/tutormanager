from DBFunctions import checkTokenExists, dbListAllBookings, dbListMyBookings, dbMakeBooking, dbDeleteBooking, dbCheckDuplicateBooking, getUsername

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

def makeBooking(session_token, sUser, tUser, sTime, eTime):
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  # Check if booking between the two already exist
  if dbCheckDuplicateBooking(sUser, tUser):
    return {"error": "Booking already exists."}
  
  dbMakeBooking(sUser, tUser, sTime, eTime)

  return {
    "token": session_token
  }

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
  return

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(deleteBooking('1', 'username8', 'username7'))