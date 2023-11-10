from DBFunctions import checkTokenExists, dbAllNotifications, dbDismissNotif

def checkMyNotifications(session_token: str) -> dict:
  """Recieves all the notifications for the user
    Paramaters:
      session_token: String

    Returns:
      { session_token: String,
        notifList: list}
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllNotif = dbAllNotifications(session_token)

  return {
    "token": session_token,
    "notifList": listOfAllNotif
  }

def dismissNotif(session_token: str, notifID: str) -> dict:
  """Dismisses a single notification
    Paramaters:
      session_token: String

    Returns:
      { session_token: String}
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  dbDismissNotif(notifID)

  return {
    "token": session_token
  }

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(dismissNotif('3', '2'))