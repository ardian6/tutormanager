import psycopg2
import sys

db = None

#Create all db related functions
def dblogin(token, username, password):
    #Store Token into database

def dbregister(token, email, username, password, firstName, lastName, userType):
    #Store Token into database
    #Store a new account into database

def dblogout(token):
    #Remove Token from database


if __name__ == '__main__':
    try:
        db = psycopg2.connect(
        host="localhost",
        database="alltutors",
        user="postgres",
        password="testing")
    except psycopg2.Error as err:
        print("DB error: ", err)
    except Exception as err:
        print("Internal Error: ", err)
        raise err
    finally:
        if db is not None:
            db.close()
    sys.exit(0)