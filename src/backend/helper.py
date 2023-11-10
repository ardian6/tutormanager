import hashlib

SECRET = "f12apenguin"

def getHashOf(text: str):
  """Creates a hash of the given string
    Paramaters:
      text: String,
    Returns:
      Hashed version of 'text': String
  """
  return hashlib.sha256(text.encode()).hexdigest()