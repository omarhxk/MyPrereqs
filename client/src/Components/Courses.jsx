import NthYearCourses from './NthYearCourses.jsx'

function Courses() {

    const courses1 = [{courseCode: "CSCA08", courseName: "Intro to Comp Sci I"}, {courseCode: "CSCA48", courseName: "Intro to Comp Sci II"}]
    const courses2 = [{courseCode: "CSCB09", courseName: "System Tools & Programming"}, {courseCode: "CSCB07", courseName: "Software Design"}]
    const courses3 = [{courseCode: "CSCC01", courseName: "Intro to Software Engineering"}, {courseCode: "CSCC09", courseName: "Development on The Web"}]
    const courses4 = [{courseCode: "CSCD01", courseName: "Intro to Software Engineering II"}, {courseCode: "CSCD09", courseName: "Development on The Web II"}]

    return(
        <div className="flex flex-grow justify-center">
        <NthYearCourses text="First Year" courses={courses1}/>
        <NthYearCourses text="Second Year" courses={courses2}/>
        <NthYearCourses text="Third Year" courses={courses3}/>
        <NthYearCourses text="Fourth Year" courses={courses4}/>

        </div>
    )
}

export default Courses