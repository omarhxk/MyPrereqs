from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import getCourseCodeFormat, getPrereqs, isCourseCode

app = Flask(__name__)
CORS(app)

@app.route("/api/get_prereqs/", methods=["GET", "POST"])
def get_prereqs():
    
    #preReqs = getPrereqs("https://utsc.calendar.utoronto.ca/course/cscc01h3", [4, 2, 1, 1])
    data = request.get_json()
    courseSite = data.get("coursesite", "")
    courseCode = data.get("coursecode", "")

    courseCodeFormat = getCourseCodeFormat(courseCode)
    preReqs = getPrereqs(courseSite, courseCodeFormat)
    
    response = jsonify({"prerequisites": preReqs})
    #response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173/")
    print(response)
    return response 

if __name__ == "__main__":
    app.run(port=5000)