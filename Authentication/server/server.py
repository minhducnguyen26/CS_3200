from socketserver import ThreadingMixIn
from http.server import BaseHTTPRequestHandler, HTTPServer
from http import cookies
from urllib.parse import parse_qs
import json
from items_db import ItemsDB
from users_db import UsersDB
from passlib.hash import bcrypt
from session_store import SessionStore

# Instantiate a global variable of the SessionStore class
global_SessionStore = SessionStore()
 
class MyRequestHandler(BaseHTTPRequestHandler):

    def load_cookie(self):
        # Read the cookie header FROM client
        # and save it for later
        if "Cookie" in self.headers:
            self.cookie = cookies.SimpleCookie(self.headers["Cookie"])
        else:
            self.cookie = cookies.SimpleCookie()

    def send_cookie(self):
        # Send one or more Set-Cookie headers TO client
        for morsel in self.cookie.values():
            self.send_header("Set-Cookie", morsel.OutputString())

    def load_session(self):
        # Find cookie data inside self.cookie
        self.load_cookie()
        
        # Check session ID is in the cookie?
        if "sessionId" in self.cookie:
            sessionId = self.cookie["sessionId"].value  
            # load session data from session store using session ID  
            self.sessionData = global_SessionStore.getSessionData(sessionId)
            
            # if session data does not exist:
            if self.sessionData == None:
                # create new session ID and new entry in session store
                sessionId = global_SessionStore.createSession()
                self.sessionData = global_SessionStore.getSessionData(sessionId)
                # assign new session ID into the cookie
                self.cookie["sessionId"] = sessionId
        else:
            # create new session ID and new entry in session store
            sessionId = global_SessionStore.createSession()
            self.sessionData = global_SessionStore.getSessionData(sessionId)
            # assign new session ID into the cookie
            self.cookie["sessionId"] = sessionId

    def end_headers(self):
        # Send cookies to client first
        self.send_cookie()
        self.send_header("Access-Control-Allow-Origin", self.headers["Origin"])
        self.send_header("Access-Control-Allow-Credentials", "true")

        # Call the original end_headers
        BaseHTTPRequestHandler.end_headers(self)

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("SERVER NOT FOUND.", "utf-8"))

    def handle_401(self):
        self.send_response(401)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("USER NOT AUTHENTICATED.", "utf-8"))
      
    # Handle POST method
    def handle_list_items(self):
        if "userId" not in self.sessionData:
            self.handle_401()
            return
        else:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()

            # send data to the client via the response body
            db = ItemsDB()
            allRecords = db.get_all_items()
            self.wfile.write(bytes(json.dumps(allRecords), "utf-8"))

    def handle_retrieve_item(self, item_id):
        if "userId" not in self.sessionData:
            self.handle_401()
            return
        else:
            db = ItemsDB()
            item_record = db.get_one_item(item_id)

            if item_record != None:
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(bytes(json.dumps(item_record), "utf-8"))
            else:
                self.handleNotFound()

    def handle_add_item(self):
        if "userId" not in self.sessionData:
            self.handle_401()
            return
        else:
            # step 1: determine the number of bytes to read from the request body
            length = int(self.headers["Content-Length"])

            # step 2: use the length, read the raw request body
            request_body = self.rfile.read(length).decode("utf-8")
            print("The request body is:", request_body)

            # step 3: parse the urlencoded data
            parse_body = parse_qs(request_body)
            print("The parsed body is:", parse_body)

            # step 4: access and store the data
            name      = parse_body["name"][0]
            location  = parse_body["location"][0]
            price     = parse_body["price"][0]
            image     = parse_body["image"][0]

            # save data to the "database"
            db = ItemsDB()
            db.add_item(name, location, price, image)

            # respond to the client when done; no response body needed
            self.send_response(201)
            self.end_headers()

    def handle_update_item(self, item_id):
        if "userId" not in self.sessionData:
            self.handle_401()
            return
        else:
            length = int(self.headers["Content-Length"])

            # step 2: use the length, read the raw request body
            request_body = self.rfile.read(length).decode("utf-8")
            print("The request body is:", request_body)

            # step 3: parse the urlencoded data
            parse_body = parse_qs(request_body)
            print("The parsed body is:", parse_body)

            # step 4: access and store the data
            name      = parse_body["name"][0]
            location  = parse_body["location"][0]
            price     = parse_body["price"][0]
            image     = parse_body["image"][0]

            # update changes to the "database"
            db = ItemsDB()
            item_record = db.get_one_item(item_id)

            if item_record != None:
                db.edit_item(name, location, price, image, item_id)
                self.send_response(200)
                self.end_headers()
            else:
                self.handleNotFound()

    def handle_delete_item(self, item_id):
        if "userId" not in self.sessionData:
            self.handle_401()
            return
        else:
            db = ItemsDB()
            item_record = db.get_one_item(item_id)

            if item_record != None:
                # DELETE the file here!
                db.delete_item(item_id)
                self.send_response(200)
                self.end_headers()
            else:
                self.handleNotFound()

    def do_OPTIONS(self):
        self.load_session()
        self.send_response(204)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        self.load_session()

        # this is an incoming GET request
        print("The request path is:", self.path)
        path_parts = self.path.split("/")
        collection = path_parts[1]
        if len(path_parts) > 2:
            member_id = path_parts[2]
        else: 
            member_id = None

        if collection == "items":
            if member_id:
                self.handle_retrieve_item(member_id)
            else:
                self.handle_list_items()
        else:
            self.handleNotFound()

    def do_POST(self):
        self.load_session()

        if self.path == "/items":
            self.handle_add_item()
        elif self.path == "/users":
            self.handle_add_user()
        elif self.path == "/sessions":
            self.handle_verify_user()
        else:
            self.handleNotFound()

    def do_PUT(self):
        self.load_session()

        path_parts = self.path.split("/")
        collection = path_parts[1]
        if len(path_parts) > 2:
            member_id = path_parts[2]
        else: 
            member_id = None

        if collection == "items":
            if member_id:
                self.handle_update_item(member_id)
            else:
                self.handleNotFound()
        else:
            self.handleNotFound()

    def do_DELETE(self):
        self.load_session()

        path_parts = self.path.split("/")
        collection = path_parts[1]
        if len(path_parts) > 2:
            member_id = path_parts[2]
        else: 
            member_id = None

        if collection == "items":
            if member_id:
                self.handle_delete_item(member_id)
            else:
                self.handleNotFound()
        else:
            self.handleNotFound()

    def handle_add_user(self):
        # step 1: determine the number of bytes to read from the request body
        length = int(self.headers["Content-Length"])

        # step 2: use the length, read the raw request body
        request_body = self.rfile.read(length).decode("utf-8")
        print("The request body is:", request_body)

        # step 3: parse the urlencoded data
        parse_body = parse_qs(request_body)
        print("The parsed body is:", parse_body)

        # step 4: access and store the data
        first_name = parse_body["first_name"][0]
        last_name  = parse_body["last_name"][0]
        email      = parse_body["email"][0]
        password   = parse_body["password"][0]

        # save data to the "database"
        db = UsersDB()
        unique_email = db.add_user(first_name, last_name, email, password)

        if  unique_email == True:
            # respond to the client when done; no response body needed
            self.send_response(201)
            self.end_headers()       
        else:
            self.send_response(422)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()

    def handle_verify_user(self):
        # step 1: determine the number of bytes to read from the request body
        length = int(self.headers["Content-Length"])

        # step 2: use the length, read the raw request body
        request_body = self.rfile.read(length).decode("utf-8")
        print("The request body is:", request_body)

        # step 3: parse the urlencoded data
        parse_body = parse_qs(request_body)
        print("The parsed body is:", parse_body)

        # step 4: access the data
        email    = parse_body["email"][0]
        password = parse_body["password"][0]

        db = UsersDB()
        user_found = db.find_user_by_email(email, password)

        if user_found:
            saved_password = user_found["password"]
            verified = bcrypt.verify(password, saved_password)

            # User Found with Verified Password
            if verified:
                self.send_response(201)
                self.end_headers()
                # save user ID into the session data
                self.sessionData["userId"] = user_found["id"]
            # Password Unverified
            else:
                self.handle_401()
        # User Not Found
        else:
            self.handle_401()

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    # Nothing to see here
    pass

def run():
# the main function
    # 127.0.0.1 is local IP address
    # 8080 is the port number
    listen = ("127.0.0.1", 8080)
    server = ThreadedHTTPServer(listen, MyRequestHandler)
    print("The server is running!")
    server.serve_forever()
    print("Codes after the previous line won't run.")

run()