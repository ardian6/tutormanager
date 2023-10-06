import psycopg2
import sys

db = None 

def setupTables():
  # Setting up all tables
  return

def clearData():
  return

def inputData1():
  return

def inputData2():
  return 

if __name__ == '__main__':
    try:
        db = psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="postgres",
        user="penguin3900",
        password="3900PenguinDBtest",
        port='5432')
        setupTables()
    except psycopg2.Error as err:
        print("DB error: ", err)
    except Exception as err:
        print("Internal Error: ", err)
        raise err
    finally:
        if db is not None:
            db.close()
    sys.exit(0)