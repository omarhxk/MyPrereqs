import ImportCoursesModal from '../Components/InputCoursesModal.jsx'
import ReviewCoursesForm from '../Components/ReviewCoursesForm.jsx'

function NoPage() {

    return(
        <>
            <h1>Page not Found</h1>
            <ReviewCoursesForm 
                courseCodes={["CSCA08H3", "CSCA48H3", "CSCC01H3"]}
                courseNames={["Intro to CS I", "Intro to CS II", "Intro to Software Engineering"]}
                courseLevels={["1", "1", "3"]}
                coursePrereqs={[[], ["CSCA08H3"], ["CSCB07H3", "CSCB09H3"]]}/>
            
        </>
    )
}

export default NoPage