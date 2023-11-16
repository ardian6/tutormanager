import psycopg2
import sys
from helper import getHashOf

db = None

# Creating all the tables and types
def setupTables():
  cur = db.cursor()

  cur.execute("""create type uType as ENUM (
	'student',
  'tutor',
  'admin'
  )""")

  cur.execute("""create table Users (
	username    varchar(30) not null,
  password    varchar(1000) not null,
  email       varchar(30) not null,
	givenName   varchar(30) not null,
	familyName  varchar(30),
  userType    uType,
  bio         varchar(300),
  location    varchar(30),
  phone       varchar(30),
  timezone    varchar(15),
  approved    boolean,
  profilePic  varchar(1000000),
  youtubeLink varchar(60000),
	primary key (username)
  )""")

  cur.execute("""create table Sessions (
	sessID      varchar(1000),
  username    varchar(30),
	primary key (sessID),
  foreign key (username) references users(username)
  )""")

  cur.execute("""create table Courses (
  courseName  varchar(30),
  primary key(courseName)
  )""")

  cur.execute("""create table userCourse (
	course      varchar(30) references courses(courseName),
  username    varchar(30) references users(username),
	primary key (course, username)
  )""")

  cur.execute("""create table bookings (
	bookingID   varchar(30),
  stuUser     varchar(30) references users(username),
  tutUser     varchar(30) references users(username),
  startTime   timestamp,
  endTime     timestamp,
  approved    boolean,
  description  varchar(300),
	primary key (bookingID)
  )""")

  cur.execute("""create table messages (
	msgID       varchar(30),
  stuUser     varchar(30) references users(username),
  tutUser     varchar(30) references users(username),
  timeSent    timestamp,
  message     varchar(1000),
  sentBy      varchar(30) references users(username),
	primary key (msgID)
  )""")

  cur.execute("""create table ratings (
  ratingID      varchar(30),
  stuUser       varchar(30) references users(username),
  tutUser       varchar(30) references users(username),
  timeSent      timestamp,
  ratingMessage varchar(1000),
  ratingNumber  numeric,
	primary key   (ratingID)
  )""")

  cur.execute("""create table notifications (
  notifID       varchar(30),
  nameOfuser    varchar(30) references users(username),
  timeSent      timestamp,
  notifMessage  varchar(1000),
	primary key   (notifID)
  )""")

  cur.execute("""create table documentation (
  docID         varchar(30),
  nameOfUser    varchar(30) references users(username),
  documentData  varchar(60000),
	primary key   (docID)
  )""")


  cur.close()
  db.commit()
  return

# Deleting all tables and types
def deleteTables():
  cur = db.cursor()

  cur.execute("""drop table Sessions""")
  cur.execute("""drop table userCourse""")
  cur.execute("""drop table Courses""")
  cur.execute("""drop table bookings""")
  cur.execute("""drop table messages""")
  cur.execute("""drop table ratings""")
  cur.execute("""drop table notifications""")
  cur.execute("""drop table documentation""")
  cur.execute("""drop table Users""")

  cur.execute("""drop type uType""")
  cur.close()
  db.commit()
  return

# Clear all the data from the tables
def clearData():
  cur = db.cursor()
  cur.execute("""delete from Sessions""")
  cur.execute("""delete from userCourse""")
  cur.execute("""delete from bookings""")
  cur.execute("""delete from Courses""")
  cur.execute("""delete from messages""")
  cur.execute("""delete from ratings""")
  cur.execute("""delete from notifications""")
  cur.execute("""delete from documentation""")
  cur.execute("""delete from Users""")
  cur.close()
  db.commit()
  return

# Input dummy data for user table
def inputData1():
  cur = db.cursor()
  cur.execute(f"""insert into Users values ('johnsmith', '{getHashOf('password1')}', 'johnsmith@gmail.com', 'John', 'Smith', 'admin', 'I am an admin on the site', 'sydney', '11111111', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('tomfarley', '{getHashOf('password2')}', 'tomfarley@gmail.com', 'Tom', 'Farley', 'student', 'Hello, I am a year 11 student in high school', 'sydney', '22222222', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('bobholt', '{getHashOf('password3')}', 'bobholt@gmail.com', 'Bob', 'Holt', 'student', '4th year commerce student at uni', 'sydney', '33333333', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('jesshuff', '{getHashOf('password4')}', 'jesshuff@gmail.com', 'Jess', 'Huffman', 'tutor', 'Tutor that can teach many topics', 'sydney', '44444444', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('nickbarr', '{getHashOf('password5')}', 'nickbarr@gmail.com', 'Nick', 'Barr', 'student', 'year 10', 'sydney', '55555555', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('gwenmelton', '{getHashOf('password6')}', 'gwenmelton@gmail.com', 'Gwen', 'Melton', 'tutor', 'Tutor with 10 years experience', 'perth', '66666666', 'AWST', False, '', '')""")
  cur.execute(f"""insert into Users values ('stefanj', '{getHashOf('password7')}', 'stefanj@gmail.com', 'Stefan', 'Jones', 'tutor', 'Retired teacher', 'sydney', '77777777', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('adamowen', '{getHashOf('password8')}', 'adamowen@gmail.com', 'Adam', 'Owens', 'student', 'First year uni looking for help', 'sydney', '88888888', 'AEST', True, '', '')""")
  cur.execute(f"""insert into Users values ('rolandb', '{getHashOf('password9')}', 'rolandb@gmail.com', 'Roland', 'Banks', 'admin', 'New Admin', 'sydney', '99999999', 'AEST', True, '', '')""")
  cur.close()
  db.commit()
  return

# Input dummy data for session table
def inputData2():
  cur = db.cursor()
  cur.execute("""insert into Sessions values ('1', 'johnsmith')""")
  cur.execute("""insert into Sessions values ('2', 'bobholt')""")
  cur.execute("""insert into Sessions values ('3', 'jesshuff')""")
  cur.close()
  db.commit()
  return

# Input dummy data for course table
def inputData3():
  cur = db.cursor()
  cur.execute("""insert into Courses values ('maths')""")
  cur.execute("""insert into Courses values ('english')""")
  cur.close()
  db.commit()
  return

# Input dummy data for userCourse table
def inputData4():
  cur = db.cursor()
  cur.execute("""insert into userCourse values ('maths', 'bobholt')""")
  cur.execute("""insert into userCourse values ('english', 'nickbarr')""")
  cur.execute("""insert into userCourse values ('maths', 'tomfarley')""")
  cur.execute("""insert into userCourse values ('maths', 'jesshuff')""")
  cur.close()
  db.commit()
  return

# Input dummy data for bookings table
def inputData5():
  cur = db.cursor()
  cur.execute("""insert into bookings values ('1', 'tomfarley', 'jesshuff', '2023-11-25 13:00:00', '2023-11-25 14:00:00', 'False', 'Maths')""")
  cur.execute("""insert into bookings values ('2', 'bobholt', 'jesshuff', '2023-12-15 15:00:00', '2023-12-15 17:00:00', 'True', 'Need help in algebra')""")
  cur.execute("""insert into bookings values ('3', 'nickbarr', 'jesshuff', '2023-11-20 20:00:00', '2023-11-20 22:00:00', 'False', 'Grammar')""")
  cur.execute("""insert into bookings values ('4', 'adamowen', 'jesshuff', '2023-12-01 05:00:00', '2023-12-01 08:00:00', 'False', 'Meeting')""")
  cur.close()
  db.commit()
  return

# Input dummy data for messages table
def inputData6():
  cur = db.cursor()
  cur.execute("""insert into messages values ('3', 'tomfarley', 'jesshuff', '2023-05-25 13:02:10', 'Do you offer algebra specific tutoring', 'tomfarley')""")
  cur.execute("""insert into messages values ('1', 'tomfarley', 'jesshuff', '2023-05-25 13:00:00', 'Hello, are you avaliable', 'tomfarley')""")
  cur.execute("""insert into messages values ('2', 'tomfarley', 'jesshuff', '2023-05-25 13:00:30', 'yes I am', 'jesshuff')""")
  cur.execute("""insert into messages values ('4', 'bobholt', 'jesshuff', '2023-05-25 13:02:10', 'Delete Test', 'bobholt')""")
  cur.close()
  db.commit()
  return

# Input dummy data for ratings table
def inputData7():
  cur = db.cursor()
  cur.execute("""insert into ratings values ('1', 'tomfarley', 'jesshuff', '2023-11-05 13:22:11', 'Good Tutor', 5)""")
  cur.execute("""insert into ratings values ('2', 'bobholt', 'jesshuff', '2023-11-05 16:33:40', 'Bad Tutor', 1.5)""")
  cur.execute("""insert into ratings values ('3', 'nickbarr', 'jesshuff', '2023-11-05 18:09:20', 'Ok Tutor', 3.5)""")
  cur.execute("""insert into ratings values ('4', 'tomfarley', 'gwenmelton', '2023-11-05 18:09:20', 'Excellent Tutor', 5)""")
  cur.close()
  db.commit()
  return

# Input dummy data for notifications table
def inputData8():
  cur = db.cursor()
  cur.execute("""insert into notifications values ('1', 'tomfarley', '2023-05-28 13:00:00', 'Your booking with username4 has been accepted')""")
  cur.execute("""insert into notifications values ('2', 'jesshuff', '2023-05-25 13:00:00', 'You have received new messages from username2')""")
  cur.execute("""insert into notifications values ('3', 'jesshuff', '2023-11-05 13:22:11', 'A new rating has been made on you by username2')""")
  cur.close()
  db.commit()
  return

# Print out all the data in the database currently
def printData():
  cur = db.cursor()
  print('Users table')
  cur.execute("""select u.username, u.password, u.email, u.givenName, u.familyName, u.userType, u.bio, u.location, u.phone, u.timezone, u.approved from Users u""")
  for t in cur.fetchall():
    print(t)
  print('Sessions table')
  cur.execute("""select s.sessID, s.username from Sessions s""")
  for t in cur.fetchall():
    print(t)
  print('Course table')
  cur.execute("""select c.courseName from Courses c""")
  for t in cur.fetchall():
    print(t)
  print('UserCourse table')
  cur.execute("""select c.course, c.username from userCourse c""")
  for t in cur.fetchall():
    print(t)
  print('Bookings table')
  cur.execute("""select b.bookingID, b.stuUser, b.tutUser, b.startTime, b.endTime, b.approved, b.description from bookings b""")
  for t in cur.fetchall():
    print(t)
  print('Messages table')
  cur.execute("""select m.msgID, m.stuUser, m.tutUser, m.timeSent, m.message, m.sentBy from messages m""")
  for t in cur.fetchall():
    print(t)
  print('Ratings table')
  cur.execute("""select r.ratingID, r.stuUser, r.tutUser, r.timeSent, r.ratingMessage, r.ratingNumber from ratings r""")
  for t in cur.fetchall():
    print(t)
  print('notifications table')
  cur.execute("""select n.notifID, n.nameOfuser, n.timesent, n.notifMessage from notifications n""")
  for t in cur.fetchall():
    print(t)
  cur.close()
  return

# Testing function for myself (Mathew)
def test():
  cur = db.cursor()
  cur.execute("""select s.username from Sessions s where s.sessID = %s""", ['3'])
  oldUsername = None
  for t in cur.fetchall():
      oldUsername = t[0]
  cur.execute("""delete from Sessions s where s.sessID = %s""", ['3'])
  cur.execute("""update Users set username = %s where username = %s""", ['ChangeUsername', oldUsername])
  cur.execute("""insert into Sessions values (%s, %s)""", ['3', 'ChangeUsername'])
  cur.close()
  db.commit()
  return

# Running this file connects to the database and executes whatever function you want in this file
if __name__ == '__main__':
    try:
        db = psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="penguinproject",
        user="penguin3900",
        password="3900PenguinDBtest",
        port='5432')

        # deleteTables()
        # setupTables()
        # clearData()
        # inputData1()
        # inputData2()
        # inputData3()
        # inputData4()
        # inputData5()
        # inputData6()
        # inputData7()
        # inputData8()
        # test()
        printData()

    except psycopg2.Error as err:
        print("DB error: ", err)
    except Exception as err:
        print("Internal Error: ", err)
        raise err
    finally:
        if db is not None:
            db.close()
    sys.exit(0)