import CourseCard from "./CourseCard.jsx";

const firstYearCourses = function(props) {

    return(
        <>
        <div className="text-center m-6 tracking-tight">
        <h3>{props.text}</h3>
        <div className="flex flex-col space-y-6">
            {props.courses.map((course) => (
                <CourseCard courseCode={course.courseCode} 
                courseName={course.courseName} 
                courseCompleted={course.courseCompleted}/>
            ))}
            
         </div>
        </div>
        

        </>
    )
}

export default firstYearCourses;