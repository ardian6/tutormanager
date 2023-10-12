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
	primary key (username)
  )""")

  cur.execute("""create table Sessions (
	sessID      varchar(1000),
  username    varchar(30),
	primary key (sessID),
  foreign key (username) references users(username)
  )""")

  cur.execute("""create table userCourse (
	course      varchar(30),
  username    varchar(30),
	primary key (course, username),
  foreign key (username) references users(username)
  )""")
  cur.close()
  db.commit()
  return

# Deleting all tables and types
def deleteTables():
  cur = db.cursor()

  cur.execute("""drop table Sessions""")
  cur.execute("""drop table userCourse""")
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
  cur.execute("""delete from Users""")
  cur.close()
  db.commit()
  return

# Input dummy data for user table
def inputData1():
  cur = db.cursor()
  cur.execute(f"""insert into Users values ('username1', '{getHashOf('password1')}', 'email1@gmail.com', 'givenname1', 'famailyName1', 'admin', 'bio1', 'location1', 'phone1', 'timezone1', True)""")
  cur.execute(f"""insert into Users values ('username2', '{getHashOf('password2')}', 'email2@gmail.com', 'givenname2', 'famailyName2', 'student', 'bio2', 'location2', 'phone2', 'timezone2', True)""")
  cur.execute(f"""insert into Users values ('username3', '{getHashOf('password3')}', 'email3@gmail.com', 'givenname3', 'famailyName3', 'student', 'bio3', 'location3', 'phone3', 'timezone3', True)""")
  cur.execute(f"""insert into Users values ('username4', '{getHashOf('password4')}', 'email4@gmail.com', 'givenname4', 'famailyName4', 'tutor', 'bio4', 'location4', 'phone4', 'timezone4', True)""")
  cur.execute(f"""insert into Users values ('username5', '{getHashOf('password5')}', 'email5@gmail.com', 'givenname5', 'famailyName5', 'student', 'bio5', 'location5', 'phone5', 'timezone5', True)""")
  cur.execute(f"""insert into Users values ('username6', '{getHashOf('password6')}', 'email6@gmail.com', 'givenname6', 'famailyName6', 'tutor', 'bio6', 'location6', 'phone6', 'timezone6', False)""")
  cur.close()
  db.commit()
  return

# Input dummy data for session table
def inputData2():
  cur = db.cursor()
  cur.execute("""insert into Sessions values ('1', 'username1')""")
  cur.execute("""insert into Sessions values ('2', 'username3')""")
  cur.execute("""insert into Sessions values ('3', 'username4')""")
  cur.close()
  db.commit()
  return

# Input dummy data for userCourse table
def inputData3():
  cur = db.cursor()
  cur.execute("""insert into userCourse values ('Maths', 'username3')""")
  cur.execute("""insert into userCourse values ('English', 'username5')""")
  cur.execute("""insert into userCourse values ('Maths', 'username2')""")
  cur.close()
  db.commit()

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
  cur.execute("""select c.course, c.username from userCourse c""")
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