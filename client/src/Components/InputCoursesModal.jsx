import { useState } from 'react'
import InputCoursesForm from './InputCoursesForm.jsx'
import supabase from '../supabase-client.js'


function InputCoursesModal() {

    const [coursesInputted, setCoursesInputted] = useState(false)
    const [courseCodes, setCourseCodes] = useState([])
    const [courseNames, setCourseNames] = useState([])
    const [courseLevels, setCourseLevels] = useState([])
    const [coursePrereqs, setCoursePrereqs] = useState([])


    return(
        coursesInputted ? <InputCoursesForm 
            setCoursesInputted={setCoursesInputted} 
            courseCodes={courseCodes} 
            setCourseCodes={setCourseCodes} 
            setCourseNames={setCourseNames} 
            setCourseLevels={setCourseLevels} 
            setCoursePrereqs={setCoursePrereqs}/> 
            : <ReviewCoursesForm 
                courseCodes={courseCodes} 
                courseNames={courseNames}
                courseLevels={courseLevels}
                coursePrereqs={coursePrereqs}
                setCourseCodes={setCourseCodes}
                setCourseNames={setCourseNames}
                setCourseLevels={setCourseLevels}
                setCoursePrereqs={setCoursePrereqs}/>
        
        
    )
}








export default InputCoursesModal