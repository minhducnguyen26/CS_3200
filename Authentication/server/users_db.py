import sqlite3
from passlib.hash import bcrypt

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class UsersDB:
    def __init__(self):
        self.connection = sqlite3.connect("users.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()
    
    # INSERT into the table
    def add_user(self, first_name, last_name, email, password):
        check_email = [email]
        self.cursor.execute("SELECT * FROM users WHERE email = ?", check_email)
        email_found = self.cursor.fetchall()

        unique_email = True
        if email_found:
            unique_email = False
        else:
            hashed_password = bcrypt.hash(password)
            data = [first_name, last_name, email, hashed_password]
            self.cursor.execute("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", data)
            self.connection.commit() 
        
        return unique_email

    def find_user_by_email(self, email, password):
        data = [email]
        self.cursor.execute("SELECT * FROM users WHERE email = ?", data)
        user_found = self.cursor.fetchone()
        return user_found