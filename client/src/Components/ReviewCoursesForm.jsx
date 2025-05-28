import ModalHeader from "./ModalHeader"
import ModalMessage from "./ModalMessage"

function ReviewCoursesForm( { courseCodes, courseNames, courseLevels, coursePrereqs, setCourseCodes, setCourseNames, setCourseLevels, setCoursePrereqs } ) {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-180 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl">
            <ModalHeader text="Review Course Details"/>
            <ModalMessage text="Please verify the following course information"/>
            <div className="space-y-4">
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

        </div>
    )
}

export default ReviewCoursesForm