import { useState } from 'react'
import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'

function InputCoursesModal() {
    const [text, setText] = useState("")

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-180 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl">
            <ModalHeader text="Enter Courses"/>
            <ModalMessage text="Copy and Paste your required courses into the box below!"/>
            <textarea type="text" className="flex-grow bg-white mx-2 p-2" onChange={(e) => setText(e.target.value)}/>
            <div className="flex justify-end space-x-4 m-4">
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-red-300 text-white mt-5 bg-red-500 cursor-pointer">Back</button>
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer" onClick={() => getCourses(text, 4, 2, true)}>Continue</button>
            </div>
        </div>
    )
}


function isDigit(char) {
    return !isNaN(char) && char.trim() !== '';
  }


function getSiteStructure(sampleCode ,sampleSite) {
    let ind = sampleSite.indexOf(sampleCode)
    if (ind == -1) {
        //try "letters" + "/" + "numbers" 
        for (let i = 0; i < sampleCode.length; i++) {
            if (isDigit(char)) {
                break
            }
        }
        const startOfCode = sampleCode.slice(0, i)
        const endOfCode = sampleCode.slice(i)
        const newCode = startOfCode + "/" + endOfCode
        ind = sampleSite.indexOf(newCode)
        if (ind == -1) {
            return ["", ""]
        }
    }

    const startOfSite = sampleSite.slice(0, ind)
    const endOfSite = sampleSite.slice(ind + sampleCode.length)
    

    return [startOfSite, endOfSite]
}


function getCourses(text, numLetters, numDigits, letterForLevel) {
    
    let courseCodes = []
    let courseNames = []
    let courseLevels = []

    const patternString = `[A-Z]{${numLetters}}\\d{${numDigits}}[A-Z]\\d.*$`;
    const coursePattern = new RegExp(patternString, "gm"); //pattern to look for

    const courses = text.match(coursePattern)
    console.log(courses)

    courses.forEach(element => {
        console.log(element)
        const firstSpace = element.indexOf(" ")

        if (firstSpace != -1) {
            const courseCode = element.slice(0, firstSpace)
            const courseName = element.slice(firstSpace + 1)

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

    console.log(courseCodes)
    console.log(courseNames)
    console.log(courseLevels)

}

export default InputCoursesModal