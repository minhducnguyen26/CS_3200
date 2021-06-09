from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
from dummydb import DummyDB

#inventory = []

class MyRequestHandler(BaseHTTPRequestHandler):

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("SERVER NOT FOUND.", "utf-8"))

    def handleListItems(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        # send data to the client via the response body

        #self.wfile.write(bytes(json.dumps(inventory), "utf-8"))
        
        db = DummyDB("inventory.dummydb")
        allRecords = db.readAllRecords()
        self.wfile.write(bytes(json.dumps(allRecords), "utf-8"))

    def handleCreateItems(self):
        # Read data from the request and insert a new pie

        # step 1: determine the number of bytes to read from the request body
        length = int(self.headers["Content-Length"])

        # step 2: use the length, read the raw request body
        request_body = self.rfile.read(length).decode("utf-8")

        # step 3: parse the urlencoded data
        parse_body = parse_qs(request_body)

        # step 4: access and store the data
        new_item = parse_body["item_name"][0] 
        
        #inventory.append(new_item)

        db = DummyDB("inventory.dummydb")
        newRecord = new_item
        db.saveRecord(newRecord)

        # respond to the client when done; no response body needed
        self.send_response(201)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def do_GET(self):
        # this is an incoming GET request
        # what about the path?
        if self.path == "/items":
            self.handleListItems()
        else:
            self.handleNotFound()

    def do_POST(self):
        if self.path == "/items":
            self.handleCreateItems()
        else:
            self.handleNotFound()

def run():
# the main function
    # 127.0.0.1 is local IP address
    # 8080 is the port number
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)
    print("The server is running!")
    server.serve_forever()

run()