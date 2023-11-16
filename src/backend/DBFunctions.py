import psycopg2
import datetime

# This is a helper function that connects to the database ()
def connectDB():
    return psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="penguinproject",
        user="penguin3900",
        password="3900PenguinDBtest",
        port='5432')

def dblogin(token: str, username: str, password: str) -> str:
    """Checks if the login information is correct by retrieving information from the database.
    Returns the type of user (Tutor, Student, Admin) on valid login or an empty string otherwise.

    Parameters:
        token: String,
        username: String,
        password: String,
    Returns:
        typeOfUser: String
    """
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
    return typeOfUser

def dbregister(token: str, email: str, username: str, password: str, firstName: str, lastName: str, userType: str):
    """Stores a new user into the database.

    Parameters:
        token: String,
        email: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        userType: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    if userType == 'tutor':
        cur.execute("""insert into Users values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", [username, password, email, firstName, lastName, userType, '', '', '', '', False, '', '',])

        #Creates a notification for all admins of a new tutor
        cur.execute("""select u.username from users u where userType = %s""", ['admin'])
        allAdmins = []
        for t in cur.fetchall():
            allAdmins.append(t[0])
        for a in allAdmins:
            notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
            notifstr = "A new tutor has been registered with name " + username
            timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, a, timeNow, notifstr])
    else:
        cur.execute("""insert into Users values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", [username, password, email, firstName, lastName, userType, '', '', '', '', True, '', '',])
    cur.execute("""insert into Sessions values (%s, %s)""", [token, username])
    cur.close()
    db.commit()
    db.close()
    return

def checkDuplicateUsername(username: str) -> bool:
    """Checks if another user in the database has the same username as the given one.
    Returns True if the username is already in use and False otherwise.

    Parameters:
        username: String,
    Returns:
        alreadyExist: Boolean
    """
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

def checkDuplicateEmail(email: str) -> bool:
    """Checks if another user in the database has the same email as the given one.
    Returns True if the email is already in use and False otherwise.

    Parameters:
        email: String,
    Returns:
        alreadyExist: Boolean
    """
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

def dblogout(token: str):
    """Removes session token from the database.
    
    Parameters:
        token: String,
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.sessID = %s""", [token])
    cur.close()
    db.commit()
    db.close()
    return

def checkTokenExists(token: str) -> bool:
    """Checks if the given token belongs to an existing user.
    
    Parameters:
        token: String,
    Returns:
        tokenExist: Boolean
    """
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
    return tokenExist

def getUsername(token: str):
    """Given a session ID (token), returns the username of the user associated with that token.
    
    Parameters:
        token: String,
    Returns:
        uName: String
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from sessions s where s.sessID = %s""", [token])
    state = cur.fetchall()
    uName = state[0][0]
    cur.close()
    db.commit()
    db.close()
    return uName

def checkTokenAdmin(token: str) -> bool:
    """Checks the given token and returns True if it belongs to an Admin user, and False otherwise.
    
    Parameters:
        token: String,
    Returns:
        tokenAdmin: Boolean
    """
    tokenAdmin = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from sessions s join users u on (u.username = s.username) where s.sessID = %s and u.userType = %s""", [token, 'admin'])
    state = cur.fetchall()
    if len(state) == 1:
        tokenAdmin = True
    cur.close()
    db.commit()
    return tokenAdmin

def dbChangeUsername(token: str, newUsername: str):
    """Changes the username of the given user.
    
    Parameters:
        token: String,
        newUsername: String
    Returns:
        Nothing
    """
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

def dbChangeEmail(token: str, newEmail: str):
    """Changes the email of the given user.
    
    Parameters:
        token: String,
        newEmail: String
    Returns:
        Nothing
    """
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

def dbChangePassword(token: str, newPass: str):
    """Changes the password of the given user.
    
    Parameters:
        token: String,
        newPass: String
    Returns:
        Nothing
    """
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

def dbChangeBio(token: str, newBio: str):
    """Changes the bio of the given user.
    
    Parameters:
        token: String,
        newBio: String
    Returns:
        Nothing
    """
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

def dbAddCourse(token: str, newCourse: str):
    """Goes into the database and adds the given course to the given user.
    
    Parameters:
        token: String,
        newCourse: String
    Returns:
        addedCourse: Boolean
    """
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

    # Returns True if successful or false if failed (Failed if course has already been added)
    return addedCourse

def dbDeleteCourse(token: str, courseToBeDeleted: str) -> bool:
    """Goes into the database and removes the given course from the given user.
    
    Parameters:
        token: String,
        courseToBeDeleted: String
    Returns:
        deletedCourse: Boolean
    """
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

    # Returns True if successful or false if failed (Failed if course cannot be deleted because they didn't have it in the first place)
    return deletedCourse

def dbDeleteAccount(token: str, password: str):
    """Removes all data related to the given user information.
    Paramaters:
        token: String
        password: String
    Returns:
        True for profile successfully deleted
    Returns:
        False for profile being unsuccessful in deletion.
    """
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
        cur.execute("""delete from bookings b where b.stuUser = %s or b.tutUser = %s""", [currUsername, currUsername])
        cur.execute("""delete from messages m where m.stuUser = %s or m.tutUser = %s""", [currUsername, currUsername])
        cur.execute("""delete from ratings r where r.stuUser = %s or r.tutUser = %s""", [currUsername, currUsername])
        cur.execute("""delete from notifications n where n.nameOfuser = %s""", [currUsername])
        cur.execute("""delete from documentation d where d.nameOfuser = %s""", [currUsername])
        cur.execute("""delete from Users u where u.username = %s""", [currUsername])

    cur.close()
    db.commit()
    return correctInfo

def dbViewProfile(targetProfile: str) -> dict:
    """Goes into the database and retrieves the information for the profile of a specific user.
    
    Parameters:
        targetProfile: String
    Returns:
        dict representing all information of the given user.
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute(""" select u.username, u.email, u.givenName, u.familyName, u.userType, u.bio, u.location, u.phone, u.timezone, u.profilePic, u.youtubeLink, u.approved
                    from users u
                    where u.username = %s""", [targetProfile])
    allData = cur.fetchone()
    cur.close()
    db.commit()
    averageRatings = 0.0
    if allData[4] == 'tutor':
        averageRatings = dbAverageRatings(targetProfile)

    allDocumentation = dbRetrieveDoc(targetProfile)

    # Return it in a dictionary format with all information
    return { 
        'username': allData[0],
        'email': allData[1],
        'givenName': allData[2],
        'familyName': allData[3],
        'userType': allData[4],
        'bio': allData[5],
        'location': allData[6],
        'phone': allData[7],
        'timezone': allData[8],
        'profilePicture': allData[9],
        'youtubeLink': allData[10],
        'approval': allData[11],
        'averageRating': averageRatings,
        'pdfStr': allDocumentation
    }

def dbAdminDelete(targetProfile: str):
    """Removes all data related to the targeted user from the database.
    
    Parameters:
        targetProfile: String
    Returns:
        Nothing
    """
    # Same warning as the dbDeleteAccount function
    # Delete the targeted profile
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.username = %s""", [targetProfile])
    cur.execute("""delete from userCourse c where c.username = %s""", [targetProfile])
    cur.execute("""delete from bookings b where b.stuUser = %s or b.tutUser = %s""", [targetProfile, targetProfile])
    cur.execute("""delete from messages m where m.stuUser = %s or m.tutUser = %s""", [targetProfile, targetProfile])
    cur.execute("""delete from ratings r where r.stuUser = %s or r.tutUser = %s""", [targetProfile, targetProfile])
    cur.execute("""delete from notifications n where n.nameOfuser = %s""", [targetProfile])
    cur.execute("""delete from documentation d where d.nameOfuser = %s""", [targetProfile])
    cur.execute("""delete from Users u where u.username = %s""", [targetProfile])
    cur.close()
    db.commit()
    return

def dbCourseList() -> list:
    """Retrieves all the courses stored in the database.
    
    Returns:
        allCourseList: list[str]
    """
    allCourseList = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select c.courseName from Courses c""")
    for t in cur.fetchall():
        allCourseList.append(t[0].lower())
    cur.close()
    db.commit()
    return allCourseList

def dbAddCourseToList(courseName: str):
    """Adds a new course to the list of all courses in the database.
    
    Paramaters:
        courseName: String,
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""insert into Courses values (%s)""", [courseName])
    cur.close()
    db.commit()
    return

# This function 
def dbRemoveCourseFromList(courseName: str):
    """Removes a course from the list of all courses in the database.
    
    Paramaters:
        courseName: String,
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from userCourse uc where uc.course = %s""", [courseName])
    cur.execute("""delete from courses c where c.courseName = %s""", [courseName])
    cur.close()
    db.commit()
    return

def dbViewMyCourses(token: str) -> list:
    """Retrieves the courses the given user is doing.
    
    Paramaters:
        token: String,
    Returns:
        myCourseList: list[str]
    """
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

def dbViewUsernameCourses(username: str) -> list:
    """Retrieves the courses assigned to the user with the given username.
    
    Paramaters:
        username: String,
    Returns:
        myCourseList: list[str]
    """
    myCourseList = []
    db = connectDB()
    cur = db.cursor()
    # Grab courses
    cur.execute("""select uc.course from userCourse uc where uc.username = %s""", [username])
    for t in cur.fetchall():
        myCourseList.append(t[0].lower())
    cur.close()
    db.commit()
    return myCourseList

def dbAllUsernames() -> list:
    """Returns the usernames of all users in the database.
    
    Returns:
        listOfAllUsers: List
    """
    listOfAllUsers = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username from Users u""")
    for t in cur.fetchall():
        listOfAllUsers.append(t[0])
    cur.close()
    db.commit()
    return listOfAllUsers

def dbListAllBookings() -> list:
    """Returns all bookings from the database.
    
    Returns:
        listOfAllBookings: List
    """
    listOfAllBookings = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime, b.approved, b.description from bookings b""")
    for t in cur.fetchall():
        newStorage = []
        newStorage.append(t[0])
        newStorage.append(t[1])
        newStorage.append(t[2])
        newStorage.append(t[3].strftime("%Y/%m/%d %H:%M:%S"))
        newStorage.append(t[4].strftime("%Y/%m/%d %H:%M:%S"))
        newStorage.append(t[5])
        newStorage.append(t[6])
        listOfAllBookings.append(newStorage)
    cur.close()
    db.commit()
    return listOfAllBookings

def dbListMyBookings(token: str) -> list:
    """Returns the given user's bookings from the database.
    
    Paramaters:
        token: String,
    Returns:
        listOfAllBookings: List
    """
    listOfAllBookings = []
    db = connectDB()
    cur = db.cursor()
    # Grab username
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    givenUser = None
    for t in cur.fetchall():
        givenUser = t[0]
    # Find bookings
    cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime, b.approved, b.description from bookings b where b.stuUser = %s or b.tutUser = %s""", [givenUser, givenUser])
    for t in cur.fetchall():
        newStorage = []
        newStorage.append(t[0])
        newStorage.append(t[1])
        newStorage.append(t[2])
        newStorage.append(t[3].strftime("%Y-%m-%d %H:%M:%S"))
        newStorage.append(t[4].strftime("%Y-%m-%d %H:%M:%S"))
        newStorage.append(t[5])
        newStorage.append(t[6])
        listOfAllBookings.append(newStorage)
    cur.close()
    db.commit()
    return listOfAllBookings

def dbListTargetBooking(targetprofile) -> list:
    """Returns the given user's bookings from the database.
    
    Paramaters:
        targetprofile: String,
    Returns:
        listOfAllBookings: List
    """
    listOfAllBookings = []
    db = connectDB()
    cur = db.cursor()
    # Find bookings
    cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime, b.approved, b.description from bookings b where b.stuUser = %s or b.tutUser = %s""", [targetprofile, targetprofile])
    for t in cur.fetchall():
        newStorage = []
        newStorage.append(t[0])
        newStorage.append(t[1])
        newStorage.append(t[2])
        newStorage.append(t[3].strftime("%Y-%m-%d %H:%M:%S"))
        newStorage.append(t[4].strftime("%Y-%m-%d %H:%M:%S"))
        newStorage.append(t[5])
        newStorage.append(t[6])
        listOfAllBookings.append(newStorage)
    cur.close()
    db.commit()
    return listOfAllBookings

def dbMakeBooking(studentUser: str, tutorUser: str, startTime: str, endTime: str, description: str):
    """Makes a booking and stores it into the database.
    
    Paramaters:
        studentUser: String,
        tutorUser: String,
        startTime: String,
        endTime: String,
        description: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    # Insert into database
    bookingId = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    sTime = datetime.datetime.strptime(startTime, '%Y-%m-%d %H:%M:%S')
    dTime = datetime.datetime.strptime(endTime, '%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into bookings values (%s, %s, %s, %s, %s, %s, %s)""", [bookingId, studentUser, tutorUser, sTime, dTime, False, description])

    notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    notifstr = "A booking has been made by " + studentUser
    timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, tutorUser, timeNow, notifstr])

    cur.close()
    db.commit()
    return

def dbDeleteBooking(studentUser: str, tutorUser: str):
    """Deletes a booking and removes it from database.
    
    Paramaters:
        studentUser: String,
        tutorUser: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    # Delete from database
    cur.execute("""delete from bookings b where b.stuUser = %s and b.tutUser = %s""", [studentUser, tutorUser])

    notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    notifstr = "The booking with " + tutorUser + " has been rejected/deleted"
    timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, studentUser, timeNow, notifstr])

    cur.close()
    db.commit()
    return

def dbCheckDuplicateBooking(studentUser: str, tutorUser: str) -> bool:
    """Check if a booking already exists between the given student and tutor.
    Returns True if a booking exists and False otherwise.
    
    Paramaters:
        studentUser: String,
        tutorUser: String
    Returns:
        existingBooking: Boolean
    """
    existingBooking = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime from bookings b where b.stuUser = %s and b.tutUser = %s""", [studentUser, tutorUser])
    for t in cur.fetchall():
        existingBooking = True
    cur.close()
    db.commit()
    return existingBooking

def dbAcceptBooking(bID: str):
    """Changes a booking accepted value to true
    
    Paramaters:
        bID: String,
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""update Bookings set approved = %s where bookingID = %s""", [True, bID])

    cur.execute("""select b.stuUser, b.tutUser from Bookings b where bookingID = %s""", [bID])
    studentUsername = ""
    tutorUsername = ""
    for t in cur.fetchall():
        studentUsername = t[0]
        tutorUsername = t[1]
    notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    notifstr = "The booking with " + tutorUsername + " has been accepted"
    timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, studentUsername, timeNow, notifstr])

    cur.close()
    db.commit()
    return

def dbAdminChangePassword(profile: str, newPass: str):
    """Allows for the admin to change a user's password.
    
    Paramaters:
        profile: String,
        newPass: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""update users set password = %s where username = %s""", [newPass, profile])
    cur.close()
    db.commit()
    return

def dbGroupUsers() -> (list, list, list):
    """Returns all users.
    
    Returns:
        allStudents: list[str],
        allTutors: list[str],
        allAdmins: list[str]
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username from users u where userType = %s""", ['student'])
    allStudents = []
    for t in cur.fetchall():
        allStudents.append(t[0])

    cur.execute("""select u.username from users u where userType = %s""", ['tutor'])
    allTutors = []
    for t in cur.fetchall():
        allTutors.append(t[0])

    cur.execute("""select u.username from users u where userType = %s""", ['admin'])
    allAdmins = []
    for t in cur.fetchall():
        allAdmins.append(t[0])

    cur.close()
    db.commit()
    return allStudents, allTutors, allAdmins

def dbListMessages(stuUser: str, tutUser: str) -> list:
    """Retreives all messages between two users
    
    Paramaters:
        stuUser: String,
        tutUser: String
    Returns:
        messageList: list[str]
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select m.msgID, m.stuUser, m.tutUser, m.timeSent, m.message, m.sentBy from messages m where m.stuUser = %s and m.tutUser = %s order by m.timeSent""", [stuUser, tutUser])
    messageList = []
    for t in cur.fetchall():
        specificMessage = []
        specificMessage.append(t[0])
        specificMessage.append(t[1])
        specificMessage.append(t[2])
        specificMessage.append(t[3].strftime("%Y-%m-%d %H:%M:%S"))
        specificMessage.append(t[4])
        specificMessage.append(t[5])
        messageList.append(specificMessage)
    cur.close()
    db.commit()
    return messageList

def dbSendMessage(stuUser: str, tutUser: str, sentBy: str, timeSent: str, message: str):
    """Stores a new message that was sent into the database
    
    Paramaters:
        stuUser: String,
        tutUser: String,
        sentBy: Float,
        timeSent: String,
        message: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()

    # Insert into database
    messageID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    timeFormat = datetime.datetime.strptime(timeSent, '%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into messages values (%s, %s, %s, %s, %s, %s)""", [messageID, stuUser, tutUser, timeFormat, message, sentBy])

    notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    notifstr = ""
    if stuUser == sentBy:
        notifstr = "You have received a message from " + stuUser
        cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, tutUser, timeNow, notifstr])
    else:
        notifstr = "You have received a message from " + tutUser
        cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, stuUser, timeNow, notifstr])

    cur.close()
    db.commit()
    return

def dbMakeRating(stuUser: str, tutUser: str, numberRate: float, reviewRate: str) -> bool:
    """Creates a new rating and stores it into the database
    
    Paramaters:
        stuUser: String,
        tutUser: String,
        numberRate: Float,
        reviewRate: String
    Returns:
        valid: Boolean
    """
    db = connectDB()
    cur = db.cursor()

    # Check if the student has had a session with the tutor
    valid = False
    cur.execute("""select b.endTime from bookings b where b.stuUser = %s and b.tutUser = %s""", [stuUser, tutUser])
    for t in cur.fetchall():
        if t[0] < datetime.datetime.now():
            valid = True

    # Insert into database
    if valid == True:
        ratingID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
        timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cur.execute("""insert into ratings values (%s, %s, %s, %s, %s, %s)""", [ratingID, stuUser, tutUser, timeNow, reviewRate, numberRate])

        notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
        notifstr = "A new rating has been made on you by " + stuUser
        timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, tutUser, timeNow, notifstr])
    cur.close()
    db.commit()
    return valid

def dbTutorRatings(tutUser: str) -> list:
    """Returns all the ratings assoicated with a specific tutor.
    
    Paramaters:
        tutUser: String,
    Returns:
        listOfAllReviews: list[str]
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select r.ratingID, r.stuUser, r.tutUser, r.timesent, r.ratingMessage, r.ratingNumber from ratings r where r.tutUser = %s""", [tutUser])
    listOfAllReviews = []
    for t in cur.fetchall():
        singleReview = []
        singleReview.append(t[0])
        singleReview.append(t[1])
        singleReview.append(t[2])
        singleReview.append(t[3].strftime("%Y-%m-%d %H:%M:%S"))
        singleReview.append(t[4])
        singleReview.append(str(t[5]))
        listOfAllReviews.append(singleReview)
    cur.close()
    db.commit()
    return listOfAllReviews

def dbAverageRatings(tutUser: str) -> float:
    """Calculates the average user rating of the given tutor user.

    Paramaters:
        tutUser: String,
    Returns:
        float representing the average rating of the given tutor.
    """
    listOfRatings = dbTutorRatings(tutUser)
    total = 0.0
    amount = 0.0
    for r in listOfRatings:
        total = total + float(r[5])
        amount = amount + 1
    if amount == 0.0:
        return 0.0
    return total/amount

def dbAllNotifications(token: str) -> list:
    """Retrieves all the notifications associated with this specific user from the database

    Paramaters:
        token: String,
    Returns:
        listOfAllNotif: list[str]
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""select n.notifID, n.nameOfuser, n.timeSent, n.notifMessage from notifications n where n.nameOfUser = %s""", [currUsername])
    listOfAllNotif = []
    for t in cur.fetchall():
        singleNotif = []
        singleNotif.append(t[0])
        singleNotif.append(t[1])
        singleNotif.append(t[2].strftime("%Y-%m-%d %H:%M:%S"))
        singleNotif.append(t[3])
        listOfAllNotif.append(singleNotif)
    cur.close()
    db.commit()
    return listOfAllNotif

def dbDismissNotif(notificationID: str):
    """Deletes the dismissed notification from database
    Paramaters:
        notificationID: String,
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from notifications n where n.notifID = %s""", [notificationID])
    cur.close()
    db.commit()
    return

def dbUploadDoc(token: str, pdfDataStr: str):
    """Stores a data string of a pdf into the database
    Paramaters:
        token: String,
        pdfDataStr: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]

    docID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    cur.execute("""insert into documentation values (%s, %s, %s)""", [docID, currUsername, pdfDataStr])

    #Creates a notification for all admins of a tutor uploading documentation
    cur.execute("""select u.username from users u where userType = %s""", ['admin'])
    allAdmins = []
    for t in cur.fetchall():
        allAdmins.append(t[0])
    for a in allAdmins:
        notifID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
        notifstr = "A new file has been uploaded by tutor " + currUsername
        timeNow = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cur.execute("""insert into notifications values (%s, %s, %s, %s)""", [notifID, a, timeNow, notifstr])

    cur.close()
    db.commit()
    return

def dbRetrieveDoc(username: str) -> list:
    """Retrieves a list of all the data string pdf of a specific user
    Paramaters:
        username: String,
    Returns:
        listOfAllData: list[str]
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select d.documentData from documentation d where d.nameOfUser = %s""", [username])
    listOfAllData = []
    for t in cur.fetchall():
        listOfAllData.append(t[0])
    cur.close()
    db.commit()
    return listOfAllData

def dbChangeYTLink(token: str, newLink: str):
    """Changes the user's YouTube Link
    Paramaters:
        token: String,
        newLink: String
    Returns:
      Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""update Users set youtubeLink = %s where username = %s""", [newLink, currUsername])
    cur.close()
    db.commit()
    return

def dbChangeProfilePic(token: str, picStr: str):
    """Changes the user's profile picture
    Paramaters:
        token: String,
        picStr: String
    Returns:
      Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""update Users set profilePic = %s where username = %s""", [picStr, currUsername])
    cur.close()
    db.commit()
    return

def dbAdminApprove(targetProfile: str):
    """Admin approves a tutor given the tutor's profile.
    Paramaters:
        targetProfile: String
    Returns:
      Nothing
    """
    # Delete the targeted profile
    db = connectDB()
    cur = db.cursor()
    cur.execute("""update Users set approved = %s where username = %s""", [True, targetProfile])
    cur.close()
    db.commit()
    return


def dbChangeLoc(token: str, newLoc: str):
    """Changes the email of the given user.
    
    Parameters:
        token: String,
        newLoc: String
    Returns:
        Nothing
    """
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from Sessions s where s.sessID = %s""", [token])
    currUsername = None
    for t in cur.fetchall():
        currUsername = t[0]
    cur.execute("""update Users set location = %s where username = %s""", [newLoc, currUsername])
    cur.close()
    db.commit()
    return

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(dbListMessages('username2', 'username4'))