import sqlite3

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

class ItemsDB:
    def __init__(self):
        self.connection = sqlite3.connect("items.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def get_all_items(self):
        # READ from the table
        self.cursor.execute("SELECT * FROM items")
        items = self.cursor.fetchall()
        return items

    def get_one_item(self, item_id):
        data = [item_id]
        self.cursor.execute("SELECT * FROM items WHERE id = ?", data)
        item = self.cursor.fetchone()
        return item
    
    # INSERT into the table
    def add_item(self, name, location, price, image):
        data = [name, location, price, image]
        self.cursor.execute("INSERT INTO items (name, location, price, image) VALUES (?, ?, ?, ?)", data)
        self.connection.commit() 
        
    def edit_item(self, name, location, price, image, item_id):
        data = [name, location, price, image, item_id]
        self.cursor.execute("UPDATE items SET name = ?, location = ?, price = ?, image = ? WHERE id = ?", data)
        self.connection.commit() 

    def delete_item(self, item_id):
        data = [item_id]
        self.cursor.execute("DELETE FROM items WHERE id = ?", data)
        self.connection.commit()