import hashlib

SECRET = "f12apenguin"

def getHashOf(text: str):
  return hashlib.sha256(text.encode()).hexdigest()