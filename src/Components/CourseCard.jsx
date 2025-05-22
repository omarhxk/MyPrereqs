import PropTypes from 'prop-types'

const CourseCard = function(props) {

    return(
        <>
            <div className="text-center rounded-2xl mx-auto shadow-xl w-40 ring-2 ring-slate-50 mt-5">
                <h2 className="text-xl font-medium tracking-tight text-slate-900">{props.courseCode}</h2>
                <p className="text-l font-light tracking-tight text-slate-900">{props.courseName}</p>
            </div>
        </>
    )
}

CourseCard.propTypes = {
    courseCode: PropTypes.string,
    courseName: PropTypes.string,
    courseCompleted: PropTypes.bool
}
export default CourseCard
