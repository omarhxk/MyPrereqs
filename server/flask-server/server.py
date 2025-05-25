from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import getCourseCodeFomrat, getPrereqs, isCourseCode

app = Flask(__name__)
cors = CORS(app)

@app.route("api/get_prereqs", methods=['POST'])
def get_prereqs():
    toReturn = {}
    data = request.get_json()
    courseSites = data.get("course-sites", [])
    courses = data.get("courses", [])

    courseCodeFormat = getCourseCodeFomrat(courses[0])
    for course, site in courses, courseSites:
        preReqs = getPrereqs(site, courseCodeFormat)
        toReturn[course] = preReqs
    
    return jsonify(toReturn)


if __name__ == "__main__":
    app.run()