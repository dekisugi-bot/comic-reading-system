import psycopg2

try:
    conn = psycopg2.connect(database = "comics_system", user = "postgres", password = "thanh0803", host = "localhost", port = "5432")
except:
    print("I am unable to connect to the database") 

cur = conn.cursor()
try:
    cur.execute("CREATE TABLE comics_system.test (id serial PRIMARY KEY, num integer, data varchar);")
except:
    print("I can't drop our test database!")

conn.commit() # <--- makes sure the change is shown in the database
conn.close()
cur.close()