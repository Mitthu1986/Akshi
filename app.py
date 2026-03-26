"""
from flask import Flask, render_template, request

app = Flask(__name__)

# Dummy user data
users = {"admin": "1234", "user": "abcd"}

@app.route("/")
def home():
    return render_template("UI.html")

@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]
    
    if username in users and users[username] == password:
        return f"Welcome {username}!"
    else:
        return "Invalid credentials, try again."

if __name__ == "__main__":
    app.run(debug=True)
"""