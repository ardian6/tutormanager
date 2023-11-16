from DBFunctions import checkTokenExists, dbListMessages, dbSendMessage

def listMessages(session_token: str, stuUser: str, tutUser: str) -> dict:
  """Grabs all messages between two users
    Paramaters:
      session_token: String

    Returns:
      { 
        session_token: String,
        messageList: list 
      }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  listOfAllMessages = dbListMessages(stuUser, tutUser)

  return {
    "token": session_token,
    "messageList": listOfAllMessages
  }

def sendMessage(session_token: str, stuUser: str, tutUser: str, sentBy: str, timeSent: str, newMessage: str) -> dict:
  """Send a message for two users
    Paramaters:
      session_token: String

    Returns:
      { session_token: String }
  """
  if not checkTokenExists(session_token):
    return {"error": "Token is invalid."}
  
  dbSendMessage(stuUser, tutUser, sentBy, timeSent, newMessage)

  return {
    "token": session_token,
  }


# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(sendMessage('2', 'username3', 'username4', 'username3', '2023-11-3 20:02:10', 'newmsg'))