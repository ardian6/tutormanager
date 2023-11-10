from DBFunctions import checkTokenExists, dbListMyBookings
import datetime

def myTotalHours(session_token: str) -> dict:
  """Grabs total hours taught
    Paramaters:
      session_token: String

    Returns:
      { session_token: String,
        hours: integer }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllBookings = dbListMyBookings(session_token)
  totalhrs = 0
  for b in listOfAllBookings:
    if datetime.datetime.strptime(b[4], '%Y-%m-%d %H:%M:%S') < datetime.datetime.now():
      diff = datetime.datetime.strptime(b[4], '%Y-%m-%d %H:%M:%S') - datetime.datetime.strptime(b[3], '%Y-%m-%d %H:%M:%S')
      hours = diff.seconds/3600
      totalhrs = totalhrs + hours

  return {
    "token": session_token,
    "hours": totalhrs
  }

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(myTotalHours('3'))