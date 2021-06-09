import os
import base64

class SessionStore:
    def __init__(self):
        # a dictionary of dictionarie
        # keyed by: sesssion ID
        self.sessions = {}

    # METHODS
    def createSession(self):
        sessionId = self.createSessionId()
        self.sessions[sessionId] = {}
        return sessionId

    # helper method
    def createSessionId(self):
        random_number = os.urandom(32)
        random_string = base64.b64encode(random_number).decode("utf-8")
        return random_string

    def getSessionData(self, sessionId):
        if sessionId in self.sessions:
            return self.sessions[sessionId]
        else:
            return None