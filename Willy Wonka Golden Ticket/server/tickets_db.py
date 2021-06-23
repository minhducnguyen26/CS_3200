import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class TicketsDB:
    def __init__(self):
        self.connection = sqlite3.connect("ticket.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def get_all_tickets(self):
        self.cursor.execute("SELECT * FROM tickets")
        tickets = self.cursor.fetchall()
        return tickets
    
    def add_new_ticket(self, entrant_name, entrant_age, guest_name, random_token):
        data = [entrant_name, entrant_age, guest_name, random_token]
        self.cursor.execute("INSERT INTO tickets (entrant_name, entrant_age, guest_name, random_token) VALUES (?, ?, ?, ?)", data)
        self.connection.commit() 