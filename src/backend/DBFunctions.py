import psycopg2
import sys

#Create all db related functions
def dblogin(token, username, password):
    # Check if login info is correct and Store Token into database
    correctPassword = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username, u.password from Users u where u.username = %s and u.password = %s""", [username, password])
    state = cur.fetchall()
    if len(state) == 1:
        cur.execute("""insert into Sessions values (%s, %s)""", [token, username])
        correctPassword = True
    cur.close()
    db.commit()
    db.close()
    return correctPassword

def dbregister(token, email, username, password, firstName, lastName, userType):
    # Store a new user into the database
    db = connectDB()
    cur = db.cursor()
    cur.execute("""insert into Users values (%s, %s, %s, %s, %s, %s)""", [username, password, email, firstName, lastName, userType])
    cur.close()
    db.commit()
    db.close()
    return

def checkRegisterDuplicateUsername(username):
    # Check if the username hasn't already been registered
    alreadyExist = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username from Users u where u.username = %s""", [username])
    state = cur.fetchall()
    if len(state) == 1:
        alreadyExist = True
    cur.close()
    db.commit()
    db.close()
    return alreadyExist

def checkRegisterDuplicateEmail(email):
    # Check if the username hasn't already been registered
    alreadyExist = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.email from Users u where u.email = %s""", [email])
    state = cur.fetchall()
    if len(state) == 1:
        alreadyExist = True
    cur.close()
    db.commit()
    db.close()
    return alreadyExist

def dblogout(token):
    # Remove Token from database
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.sessID = %s""", [token])
    cur.close()
    db.commit()
    db.close()
    return

 # Check if the token exists
def checkTokenExists(token):
    return True # -> if true it means proceed if false stop here

# Check if token exists and is an admin
def checkTokenAdmin(session_token):
    return True # -> if true it means proceed if false stop here

# This function actually goes into the database and changes the data stored
def dbChangeUsername(token, newUsername):
    return #Just changes the username

# This function actually goes into the database and changes the data stored
def dbChangeEmail(token, newEmail):
    return

# This function actually goes into the database and changes the data stored
def dbChangePassword(token, newPass):
    return

# This function actually goes into the database and changes the data stored
def dbChangeBio(token, newBio):
    # I am going to need to either edit current table or insert a new table for this functionality
    return

# This function actually goes into the database and changes the data stored
def dbAddCourse(session_token, newCourse):
    # Need to create new table or modify existing table for this
    return True  # This function returns True if successful or false if failed (Failed if course is already added)

# This function actually goes into the database and changes the data stored
def dbDeleteCourse(session_token, courseToBeDeleted):
    return True # This function returns True if successful or false if failed (Failed if course cannot be deleted because they didnt have it in the first place)

# This function actually goes into the database and changes the data stored
def dbDeleteAccount(session_token, password):
    # Check if the user assoicated with the sess token and the password match to the ones in the database
    # If the above passes we return true and delete the user sess token and profile from the database
    # Else return false
    return True

# This function actually goes into the database and retrieves the information wanted
def dbViewProfile(targetProfile):
    # Return it in a dictionary format
    return

# This function actually goes into the database and changes the data stored
def dbAdminDelete(targetProfile):
    # Delete the targeted profile
    return


# def test():
#     cur = db.cursor()
#     cur.execute('SELECT version()')
#     state = cur.fetchone()
#     print(state)

def connectDB():
    return psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="penguinproject",
        user="penguin3900",
        password="3900PenguinDBtest",
        port='5432')

# if __name__ == '__main__':
#     try:
#         db = psycopg2.connect(
#         host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
#         database="postgres",
#         user="penguin3900",
#         password="3900PenguinDBtest",
#         port='5432')
#         test()
#     except psycopg2.Error as err:
#         print("DB error: ", err)
#     except Exception as err:
#         print("Internal Error: ", err)
#         raise err
#     finally:
#         if db is not None:
#             db.close()
#     sys.exit(0)