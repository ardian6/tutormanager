import psycopg2
import sys

#Create all db related functions
def dblogin(token, username, password):
    #Store Token into database
    db = connectDB()
    cur = db.cursor()
    cur.execute('SELECT version()')
    state = cur.fetchone()
    db.close()
    return state

def dbregister(token, email, username, password, firstName, lastName, userType):
    #Store Token into database
    #Store a new account into database
    return

def dblogout(token):
    #Remove Token from database
    return

def test():
    cur = db.cursor()
    cur.execute('SELECT version()')
    state = cur.fetchone()
    print(state)

def connectDB():
    return psycopg2.connect(
        host="project3900db.cjma1ndgw4m4.ap-southeast-2.rds.amazonaws.com",
        database="postgres",
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