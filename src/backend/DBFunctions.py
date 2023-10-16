import psycopg2

# This is a helper function that connects to the database ()
def connectDB():
    return psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="penguinproject",
        user="penguin3900",
        password="3900PenguinDBtest",
        port='5432')

# Check if the login information is correct by retrieving information from the database
def dblogin(token, username, password):
    typeOfUser = ""
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username, u.password, u.userType from Users u where u.username = %s and u.password = %s""", [username, password])
    for t in cur.fetchall():
        typeOfUser = t[2]
        cur.execute("""Select s.sessID from Sessions s where s.sessID = %s""", [token])
        sessExist = False
        for t in cur.fetchall():
            sessExist = True
        if not sessExist:
            cur.execute("""insert into Sessions values (%s, %s)""", [token, username])
    cur.close()
    db.commit()
    db.close()
    return typeOfUser # Returns the usertype in string format or empty string if invalid login

# Stores a new user into the database
def dbregister(token, email, username, password, firstName, lastName, userType):
    db = connectDB()
    cur = db.cursor()
    if userType == 'tutor':
        cur.execute("""insert into Users values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", [username, password, email, firstName, lastName, userType, '', '', '', '', False])
    else:
        cur.execute("""insert into Users values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", [username, password, email, firstName, lastName, userType, '', '', '', '', True])
    cur.execute("""insert into Sessions values (%s, %s)""", [token, username])
    cur.close()
    db.commit()
    db.close()
    return

# Checks if there is already another user in the database with the same username
def checkDuplicateUsername(username):
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
    return alreadyExist #Returns true if there username is already in use and false otherwise

# Checks if there is already another user in the database with the same email
def checkDuplicateEmail(email):
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
    return alreadyExist #Returns true if there email is already in use and false otherwise

# Remove session token from the database
def dblogout(token):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.sessID = %s""", [token])
    cur.close()
    db.commit()
    db.close()
    return

 # Check if the token exists
def checkTokenExists(token):
    tokenExist = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from sessions s where s.sessID = %s""", [token])
    state = cur.fetchall()
    if len(state) == 1:
        tokenExist = True
    cur.close()
    db.commit()
    db.close()
    return tokenExist # -> Returns true if token exists otherwise false.

# Check if token exists and is an admin
def checkTokenAdmin(token):
    tokenAdmin = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from sessions s join users u on (u.username = s.username) where s.sessID = %s and u.userType = %s""", [token, 'admin'])
    state = cur.fetchall()
    if len(state) == 1:
        tokenAdmin = True
    cur.close()
    db.commit()
    return tokenAdmin # -> Returns true if token exists and it belongs to an admin otherwise false.

# This function goes into the database and changes the username stored into the new desired username
def dbChangeUsername(token, newUsername):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    oldUsername = None
    for t in cur.fetchall():
        oldUsername = t[0]
    cur.execute("""delete from Sessions s where s.sessID = %s""", [token])
    cur.execute("""update Users set username = %s where username = %s""", [newUsername, oldUsername])
    cur.execute("""insert into Sessions values (%s, %s)""", [token, newUsername])
    cur.close()
    db.commit()
    return

# This function goes into the database and changes the email stored
def dbChangeEmail(token, newEmail):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""update Users set email = %s where username = %s""", [newEmail, currUsername])
    cur.close()
    db.commit()
    return

# This function goes into the database and changes the password stored
def dbChangePassword(token, newPass):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""update Users set password = %s where username = %s""", [newPass, currUsername])
    cur.close()
    db.commit()
    return

# This function goes into the database and changes the bio stored
def dbChangeBio(token, newBio):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""update Users set bio = %s where username = %s""", [newBio, currUsername])
    cur.close()
    db.commit()
    return

# This function goes into the database and stores a user with a course
def dbAddCourse(token, newCourse):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    addedCourse = True
    cur.execute("""select c.course from userCourse c where c.username = %s and c.course = %s""", [currUsername, newCourse])   
    for t in cur.fetchall():
        addedCourse = False
    if addedCourse == True:
        cur.execute("""insert into userCourse values (%s, %s)""", [newCourse, currUsername])
    cur.close()
    db.commit()
    return addedCourse  # Returns True if successful or false if failed (Failed if course has already added)

# This function goes into the database and removes a user with a course
def dbDeleteCourse(token, courseToBeDeleted):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    deletedCourse = False
    cur.execute("""select c.course from userCourse c where c.username = %s and c.course = %s""", [currUsername, courseToBeDeleted])   
    for t in cur.fetchall():
        deletedCourse = True
    if deletedCourse == True:
        cur.execute("""delete from userCourse c where c.username = %s and c.course = %s""", [currUsername, courseToBeDeleted])
    cur.close()
    db.commit()
    return deletedCourse # Returns True if successful or false if failed (Failed if course cannot be deleted because they didnt have it in the first place)

# This function goes into the database and removes all data related to the user
def dbDeleteAccount(token, password):
    db = connectDB()
    cur = db.cursor()
    # Check if the user assoicated with the sess token and the password match to the ones in the database
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    # Checks if the password is correct
    cur.execute("""select u.username, u.password from Users u where u.username = %s and u.password = %s""", [currUsername, password])
    correctInfo = False
    for t in cur.fetchall():
        correctInfo = True
    # Warning to my future self, must delete data from all other tables first (including future ones) before deleting data from the user table
    # This warning applies to the dbAdminDelete function as well
    if correctInfo == True:
        cur.execute("""delete from Sessions s where s.username = %s""", [currUsername])
        cur.execute("""delete from userCourse c where c.username = %s""", [currUsername])
        cur.execute("""delete from Users u where u.username = %s""", [currUsername])
    cur.close()
    db.commit()
    return correctInfo # Returns true for profile successfully deleted Returns False for profile being unsuccessful in deletion.

# This function goes into the database and retrieves the information for the profile of a specific user
def dbViewProfile(targetProfile):
    db = connectDB()
    cur = db.cursor()
    cur.execute(""" select u.username, u.email, u.givenName, u.familyName, u.userType, u.bio, u.location, u.phone, u.timezone
                    from users u 
                    where u.username = %s""", [targetProfile])   
    allData = cur.fetchone()
    cur.close()
    db.commit()
    return { # Return it in a dictionary format with all information 
        'username': allData[0],
        'email': allData[1],
        'givenName': allData[2],
        'familyName': allData[3],
        'userType': allData[4],
        'bio': allData[5],
        'location': allData[6],
        'phone': allData[7],
        'timezone': allData[8],
    }

# This function goes into the database and removes all data related to the targeted user
def dbAdminDelete(targetProfile):
    # Same warning as the dbDeleteAccount function
    # Delete the targeted profile
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.username = %s""", [targetProfile])
    cur.execute("""delete from userCourse c where c.username = %s""", [targetProfile])
    cur.execute("""delete from Users u where u.username = %s""", [targetProfile])
    cur.close()
    db.commit()
    return

# This function retrieves all the courses stored in the database
def dbCourseList():
    allCourseList = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select c.courseName from Courses c""")
    for t in cur.fetchall():
        allCourseList.append(t[0].lower())
    cur.close()
    db.commit()
    return allCourseList

# This function adds a new course to the list of all courses in the database
def dbAddCourseToList(courseName):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""insert into Courses values (%s)""", [courseName])
    cur.close()
    db.commit()
    return 

# This function retrieves the courses the user is doing
def dbViewMyCourses(token):
    myCourseList = []
    db = connectDB()
    cur = db.cursor()
    # Grab username
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    # Grab courses
    cur.execute("""select uc.course from userCourse uc where uc.username = %s""", [currUsername])
    for t in cur.fetchall():
        myCourseList.append(t[0].lower())
    cur.close()
    db.commit()
    return myCourseList

def dbAllUsernames():
    listOfAllUsers = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username from Users u""")
    for t in cur.fetchall():
        listOfAllUsers.append(t[0].lower())
    cur.close()
    db.commit()
    return listOfAllUsers

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(dbAllUsernames())