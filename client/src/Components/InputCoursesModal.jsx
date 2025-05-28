import { useState } from 'react'
import InputCoursesForm from './InputCoursesForm.jsx'
import ReviewCoursesForm from './ReviewCoursesForm.jsx'
import supabase from '../supabase-client.js'


function InputCoursesModal({ setHasCompletedOnboarding }) {

    const [coursesInputted, setCoursesInputted] = useState(false)
    const [courseCodes, setCourseCodes] = useState([])
    const [courseNames, setCourseNames] = useState([])
    const [courseLevels, setCourseLevels] = useState([])
    const [coursePrereqs, setCoursePrereqs] = useState([])


    return(
        coursesInputted 
            ? <ReviewCoursesForm 
                courseCodes={courseCodes} 
                courseNames={courseNames}
                courseLevels={courseLevels}
                coursePrereqs={coursePrereqs}
                setCourseCodes={setCourseCodes}
                setCourseNames={setCourseNames}
                setCourseLevels={setCourseLevels}
                setCoursePrereqs={setCoursePrereqs}
                setCoursesInputted={setCoursesInputted}
                setHasCompletedOnboarding={setHasCompletedOnboarding}/>
            : <InputCoursesForm 
                setCoursesInputted={setCoursesInputted} 
                setCourseCodes={setCourseCodes} 
                setCourseNames={setCourseNames} 
                setCourseLevels={setCourseLevels} 
                coursePrereqs={coursePrereqs}
                setCoursePrereqs={setCoursePrereqs}/> 
        
        
    )
}



export default InputCoursesModal