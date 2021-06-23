from http.server import BaseHTTPRequestHandler, HTTPServer
from http import cookies
from urllib.parse import parse_qs
import json
from tickets_db import TicketsDB
import random

class MyRequestHandler(BaseHTTPRequestHandler):
    def load_cookie(self):
        # Read the cookie header FROM client
        # and save it for later
        if "Cookie" in self.headers:
            self.cookie = cookies.SimpleCookie(self.headers["Cookie"])
        else:
            self.cookie = cookies.SimpleCookie()

    def send_cookie(self):
        self.send_header("Set-Cookie", "oompa = loompa")

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", self.headers["Origin"])
        self.send_header("Access-Control-Allow-Credentials", "true")

        # Call the original end_headers
        BaseHTTPRequestHandler.end_headers(self)

    def handle_not_found(self):
        self.send_response(404)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("It seems that this resource has been lost in the chocolate pipes. An Oompa Loompa will be dispatched promptly to recover the artifact", "utf-8"))

    def handle_403(self):
        self.send_response(403)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("The Oompa Loompas have already received your ticket. Please try again tomorrow.", "utf-8"))
    
    def handle_list_all_tickets(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        db = TicketsDB()
        all_records = db.get_all_tickets()
        self.wfile.write(bytes(json.dumps(all_records), "utf-8"))

    def handle_add_new_ticket(self):
        if "oompa" in self.cookie:
            self.handle_403()
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
            entrant_name = parse_body["entrant_name"][0]
            entrant_age  = parse_body["entrant_age"][0]
            guest_name    = parse_body["guest_name"][0]
            random_token  = random.randint(0, 6)

            # save data to the "database"
            db = TicketsDB()
            db.add_new_ticket(entrant_name, entrant_age, guest_name, random_token)

            # respond to the client when done
            self.send_response(201)
            self.send_cookie()
            self.end_headers()

    def do_GET(self):
        self.load_cookie()

        print("The request path is:", self.path)
        path_parts = self.path.split("/")
        collection = path_parts[1]

        if collection == "tickets":
            self.handle_list_all_tickets()
        else:
            self.handle_not_found()

    def do_POST(self):
        self.load_cookie()

        if self.path == "/tickets":
            self.handle_add_new_ticket()
        else:
            self.handle_not_found()

def run():
    listen = ("127.0.0.1", 8080)
    server = HTTPServer(listen, MyRequestHandler)
    print("The server is running!")
    server.serve_forever()

run()