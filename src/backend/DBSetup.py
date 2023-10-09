import psycopg2
import sys

db = None 

def setupTables():
  # Creating all the tables and types
  cur = db.cursor()
  
  cur.execute("""create type uType as ENUM (
	'student',
  'tutor',
  'admin'
  )""")
  
  cur.execute("""create table Users (
	username    varchar(30) not null,
  password    varchar(30) not null,
  email       varchar(30) not null,
	givenName   varchar(30) not null,
	familyName  varchar(30),
  userType    uType,
	primary key (username)
  )""")
 
  cur.execute("""create table Sessions (
	sessID      varchar(30),
  username    varchar(30),
	primary key (sessID),
  foreign key (username) references users(username)
  )""")
  cur.close()
  db.commit()
  return

def deleteTables():
  # Deleting all tables and types
  cur = db.cursor()
  
  cur.execute("""drop table Sessions""")

  cur.execute("""drop table Users""")
 
  cur.execute("""drop type uType""")
  cur.close()
  db.commit()
  return

def clearData():
  # Clear all the data from the tables
  cur = db.cursor()
  cur.execute("""delete from Sessions""")
  cur.execute("""delete from Users""")
  cur.close()
  db.commit()
  return

def inputData1():
  # Input dummy data for user table
  cur = db.cursor()
  cur.execute("""insert into Users values ('username1', 'password1', 'email1gmail.com', 'givenname1', 'famailyName1', 'admin')""")
  cur.execute("""insert into Users values ('username2', 'password2', 'email2@gmail.com', 'givenname2', 'famailyName2', 'student')""")
  cur.execute("""insert into Users values ('username3', 'password3', 'email3@gmail.com', 'givenname3', 'famailyName3', 'student')""")
  cur.execute("""insert into Users values ('username4', 'password4', 'email4@gmail.com', 'givenname4', 'famailyName4', 'tutor')""")
  cur.execute("""insert into Users values ('username5', 'password5', 'email5@gmail.com', 'givenname5', 'famailyName5', 'student')""")
  cur.execute("""insert into Users values ('username6', 'password6', 'email6@gmail.com', 'givenname6', 'famailyName6', 'tutor')""")
  cur.close()
  db.commit()
  return

def inputData2():
  # Input dummy data for session table
  cur = db.cursor()
  cur.execute("""insert into Sessions values ('1', 'username1')""")
  cur.execute("""insert into Sessions values ('2', 'username5')""")
  cur.execute("""insert into Sessions values ('3', 'username2')""")
  cur.close()
  db.commit()
  return 

def printData():
  # Print out all the data in the database currently
  cur = db.cursor()
  print('Users table')
  cur.execute("""select u.username, u.password, u.email, u.givenName, u.familyName, u.userType from Users u""")
  for t in cur.fetchall():
    print(t)
  print('Sessions table')
  cur.execute("""select s.sessID, s.username from Sessions s""")
  for t in cur.fetchall():
    print(t)
  return

if __name__ == '__main__':
    try:
        db = psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="penguinproject",
        user="penguin3900",
        password="3900PenguinDBtest",
        port='5432')
        #deleteTables()
        #setupTables()
        #clearData()
        #inputData1()
        #inputData2()
        #printData()

    except psycopg2.Error as err:
        print("DB error: ", err)
    except Exception as err:
        print("Internal Error: ", err)
        raise err
    finally:
        if db is not None:
            db.close()
    sys.exit(0)