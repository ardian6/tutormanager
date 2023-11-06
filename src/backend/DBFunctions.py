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

# Check if the login information is correct by retrieving information from the database
def dblogin(token: str, username: str, password: str) -> str:
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
def dbregister(token: str, email: str, username: str, password: str, firstName: str, lastName: str, userType: str):
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
def checkDuplicateUsername(username: str):
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
def checkDuplicateEmail(email: str):
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
def dblogout(token: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.sessID = %s""", [token])
    cur.close()
    db.commit()
    db.close()
    return

 # Check if the token exists
def checkTokenExists(token: str):
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

# Returns username of a session id
def getUsername(token: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select s.username from sessions s where s.sessID = %s""", [token])
    state = cur.fetchall()
    uName = state[0][0]
    cur.close()
    db.commit()
    db.close()
    return uName

# Check if token exists and is an admin
def checkTokenAdmin(token: str):
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
def dbChangeUsername(token: str, newUsername: str):
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
def dbChangeEmail(token: str, newEmail: str):
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
def dbChangePassword(token: str, newPass: str):
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
def dbChangeBio(token: str, newBio: str):
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
def dbAddCourse(token: str, newCourse: str):
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
def dbDeleteCourse(token: str, courseToBeDeleted: str):
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
        cur.execute("""delete from Users u where u.username = %s""", [currUsername])

    cur.close()
    db.commit()
    return correctInfo

# This function goes into the database and retrieves the information for the profile of a specific user
def dbViewProfile(targetProfile: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute(""" select u.username, u.email, u.givenName, u.familyName, u.userType, u.bio, u.location, u.phone, u.timezone
                    from users u 
                    where u.username = %s""", [targetProfile])   
    allData = cur.fetchone()
    cur.close()
    db.commit()
    averageRatings = 0.0
    if allData[4] == 'tutor':
        averageRatings = dbAverageRatings(targetProfile)
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
        'averageRating': averageRatings
    }

# This function goes into the database and removes all data related to the targeted user
def dbAdminDelete(targetProfile: str):
    # Same warning as the dbDeleteAccount function
    # Delete the targeted profile
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from Sessions s where s.username = %s""", [targetProfile])
    cur.execute("""delete from userCourse c where c.username = %s""", [targetProfile])
    cur.execute("""delete from bookings b where b.stuUser = %s or b.tutUser = %s""", [targetProfile, targetProfile])
    cur.execute("""delete from messages m where m.stuUser = %s or m.tutUser = %s""", [targetProfile, targetProfile])
    cur.execute("""delete from ratings r where r.stuUser = %s or r.tutUser = %s""", [targetProfile, targetProfile])
    cur.execute("""delete from Users u where u.username = %s""", [targetProfile])
    cur.close()
    db.commit()
    return

# This function retrieves all the courses stored in the database
def dbCourseList() -> list:
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
def dbAddCourseToList(courseName: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""insert into Courses values (%s)""", [courseName])
    cur.close()
    db.commit()
    return 

# This function removes a course from the list of all courses in the database
def dbRemoveCourseFromList(courseName: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""delete from userCourse uc where uc.course = %s""", [courseName])
    cur.execute("""delete from courses c where c.courseName = %s""", [courseName])
    cur.close()
    db.commit()
    return 

# This function retrieves the courses the user is doing
def dbViewMyCourses(token: str) -> list:
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

# This function retrieves the courses the user is doing through username
def dbViewUsernameCourses(username: str) -> list:
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

# This function returns all usernames
def dbAllUsernames() -> list:
    listOfAllUsers = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select u.username from Users u""")
    for t in cur.fetchall():
        listOfAllUsers.append(t[0].lower())
    cur.close()
    db.commit()
    return listOfAllUsers

# This function returns all bookings from database
def dbListAllBookings() -> list:
    listOfAllBookings = []
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime, b.approved, b.description from bookings b""")
    for t in cur.fetchall():
        newStorage = []
        newStorage.append(t[0])
        newStorage.append(t[1].lower())
        newStorage.append(t[2].lower())
        newStorage.append(t[3].strftime("%Y/%m/%d %H:%M:%S"))
        newStorage.append(t[4].strftime("%Y/%m/%d %H:%M:%S"))
        newStorage.append(t[5])
        newStorage.append(t[6])
        listOfAllBookings.append(newStorage)
    cur.close()
    db.commit()
    return listOfAllBookings

# This function returns all my bookings from database
def dbListMyBookings(token: str) -> list:
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
        newStorage.append(t[1].lower())
        newStorage.append(t[2].lower())
        newStorage.append(t[3].strftime("%Y-%m-%d %H:%M:%S"))
        newStorage.append(t[4].strftime("%Y-%m-%d %H:%M:%S"))
        newStorage.append(t[5])
        newStorage.append(t[6])
        listOfAllBookings.append(newStorage)
    cur.close()
    db.commit()
    return listOfAllBookings

# This function makes a booking and stores into database
def dbMakeBooking(studentUser: str, tutorUser: str, startTime: str, endTime: str, description: str):
    db = connectDB()
    cur = db.cursor()
    # Insert into database
    bookingId = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    sTime = datetime.datetime.strptime(startTime, '%Y-%m-%d %H:%M:%S')
    dTime = datetime.datetime.strptime(endTime, '%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into bookings values (%s, %s, %s, %s, %s, %s, %s)""", [bookingId, studentUser, tutorUser, sTime, dTime, False, description])
    cur.close()
    db.commit()
    return

# This function deletes a booking and removes it from database
def dbDeleteBooking(studentUser: str, tutorUser: str):
    db = connectDB()
    cur = db.cursor()
    # Delete from database
    cur.execute("""delete from bookings b where b.stuUser = %s and b.tutUser = %s""", [studentUser, tutorUser])
    cur.close()
    db.commit()
    return

# This function checks if the booking exists.
def dbCheckDuplicateBooking(studentUser: str, tutorUser: str) -> bool:
    existingBooking = False
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime from bookings b where b.stuUser = %s and b.tutUser = %s""", [studentUser, tutorUser])
    for t in cur.fetchall():
        existingBooking = True
    cur.close()
    db.commit()
    return existingBooking

# This functions goes into a database and changes a booking accepted value to true
def dbAcceptBooking(bID: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""update Bookings set approved = %s where bookingID = %s""", [True, bID])
    cur.close()
    db.commit()
    return

# This functions allow for the admin to change password
def dbAdminChangePassword(profile: str, newPass: str):
    db = connectDB()
    cur = db.cursor()
    cur.execute("""update users set password = %s where username = %s""", [newPass, profile])
    cur.close()
    db.commit()
    return

# This functions returns all users
def dbGroupUsers():
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

# This function gives all messages between two users
def dbListMessages(stuUser: str, tutUser: str) -> list:
    db = connectDB()
    cur = db.cursor()
    cur.execute("""select m.msgID, m.stuUser, m.tutUser, m.timeSent, m.message, m.sentBy from messages m where m.stuUser = %s and m.tutUser = %s""", [stuUser, tutUser])
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

# This function stores a new message that was sent into the database
def dbSendMessage(stuUser: str, tutUser: str, sentBy: str, timeSent: str, message: str):
    db = connectDB()
    cur = db.cursor()
    # Insert into database
    messageID = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    timeFormat = datetime.datetime.strptime(timeSent, '%Y-%m-%d %H:%M:%S')
    cur.execute("""insert into messages values (%s, %s, %s, %s, %s, %s)""", [messageID, stuUser, tutUser, timeFormat, message, sentBy])
    cur.close()
    db.commit()
    return

# This function creates a new rating and stores it into the database
def dbMakeRating(stuUser: str, tutUser: str, numberRate: float, reviewRate: str) -> bool:
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
    cur.close()
    db.commit()
    return valid

# This function returns all the ratings assoicated with a specific tutor
def dbTutorRatings(tutUser: str) -> list:
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
        singleReview.append(t[5])
        listOfAllReviews.append(singleReview)
    cur.close()
    db.commit()
    return listOfAllReviews

# This functions returns the average rating of a specific tutor
def dbAverageRatings (tutUser: str) -> float:
    listOfRatings = dbTutorRatings(tutUser)
    total = 0.0
    amount = 0.0
    for r in listOfRatings:
        total = total + float(r[5])
        amount = amount + 1
    if amount == 0.0:
        return 0.0
    return total/amount

# Below is for myself (Mathew) to test out functions
if __name__ == '__main__':
    print(dbAdminDelete('username4'))