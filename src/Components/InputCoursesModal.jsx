import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'
import InputCourses from './InputCourses.jsx'

let inputText = ""

function InputCoursesModal() {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-180 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl">
            <ModalHeader text="Enter Courses"/>
            <ModalMessage text="Copy and Paste your required courses into the box below!"/>
            <InputCourses inputText={inputText}/>
            <div className="flex justify-end space-x-4 m-4">
                <button class="text-center rounded-2xl shadow-xl w-20 ring-2 ring-red-300 text-white mt-5 bg-red-500 cursor-pointer">Back</button>
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer" onClick={() => getCourses(inputText, 4, 2, true)}>Continue</button>
            </div>
        </div>
    )
}

let courseCodes = []
let courseNames = []
let courseLevels = []

function getCourses(text, numLetters, numDigits, letterForLevel) {
    
    const coursePattern = /\b[A-Z]{numLetters}\d{numDigits}\b.*$/ //pattern to look for
    const courses = text.match(coursePattern)
    courses.array.forEach(element => {
        const firstSpace = element.indexOf(" ")

        if (firstSpace != -1) {
            const courseCode = text.slice(0, firstSpace)
            const courseName = text.slice(firstSpace + 1)

            let level = 0
            if (letterForLevel) {
                const letterLevel = courseCode[numLetters - 1]
                switch (letterLevel) {
                    case "A":
                        level = 1
                        break
                    case "B":
                        level = 2
                        break
                    case "C":
                        level = 3
                        break
                    default:
                        level = 4
                }
            }
            else {
                level = parseInt(courseCode[numLetters])
            }

            courseCodes.push(courseCode)
            courseNames.push(courseName)
            courseLevels.push(level)

        }
    });

}

export default InputCoursesModal