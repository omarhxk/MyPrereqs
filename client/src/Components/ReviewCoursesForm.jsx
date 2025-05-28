import ModalHeader from "./ModalHeader"
import ModalMessage from "./ModalMessage"
import supabase from '../supabase-client.js'


function ReviewCoursesForm( { courseCodes, courseNames, courseLevels, coursePrereqs, setCourseCodes, setCourseNames, setCourseLevels, setCoursePrereqs, setCoursesInputted, setHasCompletedOnboarding } ) {

    const saveCourses = async () => {
        storeToDb(courseCodes, courseNames, courseLevels, coursePrereqs)
        setHasCompletedOnboarding(true)
        //updated onboarding status in db
        const {
            data: { user },
            error: userError } = await supabase.auth.getUser() 
        
    
        if (userError || !user) {
            console.error("Error getting user:", userError)
        }

        const { error } = await supabase
            .from("Profiles")
            .update({ has_completed_onboarding: true })
            .eq("user_id", user.id)
        
        if (error) {
            console.error("Error updating onboard status:", error)
        }
        
        return
    }

    
    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-180 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl">
            <ModalHeader text="Review Course Details"/>
            <ModalMessage text="Please verify the following course information"/>
            <div className="space-y-4 p-2 overflow-y-auto">
                { courseCodes.map((code, index) => ( 
                    <div key={index} className="p-4 border rounded-lg shadow space-y-2">
                        <div className="flex space-x-2">
                            <p><strong>Code:</strong></p>
                            <input value={code} className="bg-slate-100 rounded-2xl w-full block" 
                                onChange={(e) => setCourseCodes(prevCourseCodes => {
                                    const copy = [...prevCourseCodes]
                                    copy[index] = e.target.value
                                    return copy
                                })}
                                />
                        </div>
                        <div className="flex space-x-2">
                            <p><strong>Name:</strong></p>
                            <input value={courseNames[index]} className="bg-slate-100 rounded-2xl w-full block"
                                onChange={(e) => setCourseNames(prevCourseNames => {
                                    const copy = [...prevCourseNames]
                                    copy[index] = e.target.value
                                    return copy
                                })}/>
                        </div>
                        <div className="flex space-x-2">
                            <p><strong>Level/Year:</strong></p>
                            <input value={courseLevels[index]} className="bg-slate-100 rounded-2xl w-full block" type="number" max="5" min="1"
                                onChange={(e) => setCourseLevels(prevCourseLevels => {
                                    const copy = [...prevCourseLevels]
                                    copy[index] = e.target.value
                                    return copy
                                })}/>
                        </div>
                        {coursePrereqs[index].length > 0 ? (coursePrereqs[index].map((prereq, i) => (
                            <div className="flex space-x-2">
                                <p key={i}><strong>Prerequisite:</strong></p>
                                <input value={prereq} className="bg-slate-100 rounded-2xl w-full block"
                                    onChange={(e) => setCoursePrereqs(prevCoursePrereqs => {
                                        const copy = [...prevCoursePrereqs]
                                        copy[index][i] = e.target.value
                                        return copy
                                    })}/>
                            </div> ))) 
                            : null
                        }

                    </div>

                )) 

                }
            </div>

            <div className="flex justify-end space-x-4 m-4">
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-red-300 text-white mt-5 bg-red-500 cursor-pointer" onClick={() => setCoursesInputted(false)}>Back</button>
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer" onClick={() => saveCourses()}>Continue</button>
            </div>

        </div>
    )
}


const storeToDb = async (courseCodes, courseNames, courseLevels, coursePrereqs) => {
    const {
        data: { user },
        error: userError } = await supabase.auth.getUser() 
    

    if (userError || !user) {
        console.error("Error getting user:", userError)
    }

    let i = 0
    const len = courseCodes.length
    while (i < len) {
        const newCourseData = {
            user_id: user.id,
            course_code: courseCodes[i],
            course_name: courseNames[i],
            prerequisites: coursePrereqs[i],
            course_level: courseLevels[i]
        }

        const { data, error } = await supabase
            .from("CourseData")
            .insert([newCourseData])
        
        if (error) {
            console.error("Error adding course: ", error)
        }

        i++
    }
}


export default ReviewCoursesForm