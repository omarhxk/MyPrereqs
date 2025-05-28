import { useState } from 'react'
import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'
import axios from 'axios'
import supabase from '../supabase-client.js'

function InputCoursesForm( { setCoursesInputted, coursePrereqs, setCourseNames, setCourseCodes, setCourseLevels, setCoursePrereqs } ) {

    const [text, setText] = useState("")
    const [sampleCode, setSampleCode] = useState("")
    const [sampleSite, setSampleSite] = useState("")
    const [letterForLevel, setLetterForLevel] = useState(false)


    const main = async (e) => {
    
        e.preventDefault()
    
        const codeStructure = getCodeStructure(sampleCode)
        const siteStructure = getSiteStructure(sampleCode, sampleSite)

        const courses = getCourses(text, codeStructure[0], codeStructure[1], letterForLevel)
        const courseCodes = courses[0]
        const courseNames = courses[1]
        const courseLevels = courses[2]
        setCourseCodes(courseCodes)
        setCourseNames(courseNames)
        setCourseLevels(courseLevels)
        
        

        for (const code of courseCodes) {
            const site = siteStructure[0] + code + siteStructure[1] //site for the particular course
            console.log(site)
            //ACCOUNT FOR "/" CASE (tmu)
            const preReqs = await getPrereqs(site, code)
            
            //prereqs = prereqs INTERSECT courses required
            for (const preReq of preReqs) {
                if (!courseCodes.includes(preReq)) {
                    const index = preReqs.indexOf(preReq)
                    preReqs.splice(index, 1)
                }
            }
            
            setCoursePrereqs(prevCoursePrereqs => [...prevCoursePrereqs, preReqs])
        }
        
        //storeToDb(courseCodes, courseNames, courseLevels, coursePrereqs)
        setCoursesInputted(true)
        console.log(coursePrereqs)

        return
    }


    function getCourses(text, numLetters, numDigits, letterForLevel) {

        const patternString = `[A-Z]{${numLetters}}\\d{${numDigits}}(?:[A-Z]\\d)?.*$`;
        const coursePattern = new RegExp(patternString, "gm"); //pattern to look for
    
        const courses = text.match(coursePattern)
        const courseCodesArray = []
        const courseNamesArray = []
        const courseLevelsArray = []


    
        courses.forEach(element => {
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
                
                courseCodesArray.push(courseCode)
                courseNamesArray.push(courseName)
                courseLevelsArray.push(level)
                
    
            }
        });

        console.log(courseCodesArray)
    
        return[courseCodesArray, courseNamesArray, courseLevelsArray]
    
    }


    return(<form className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-180 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl" onSubmit={main}>
            <ModalHeader text="Enter Courses"/>
            <ModalMessage text="Copy and Paste your required courses into the box below!"/>
            <textarea type="text" className="flex-grow bg-white mx-2 p-2 shadow-l ring-1 ring-slate-500 rounded-xl resize-none" onChange={(e) => setText(e.target.value)} required/>
            <div className="flex space-x-2 justify-center">
                <input type="text" placeholder='Sample Course Code' className="bg-white p-2 shadow-l ring-1 ring-slate-500 rounded-xl" onChange={(e) => setSampleCode(e.target.value)} required/>
                <input type="text" placeholder='Sample Course Site' className="bg-white p-2 shadow-l ring-1 ring-slate-500 rounded-xl" onChange={(e) => setSampleSite(e.target.value)} required/>
            </div>
            <div className='flex space-x-2 justify-center'>
                <label>Course levels are signified via letter</label>
                <input type="checkbox" onChange={(e) => setLetterForLevel(e.target.checked)} className='cursor-pointer'/>
            </div>
            
            <div className="flex justify-end space-x-4 m-4">
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-red-300 text-white mt-5 bg-red-500 cursor-pointer">Back</button>
                <button className="text-center rounded-2xl shadow-xl w-20 ring-2 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer" type="submit">Continue</button>
            </div>
        </form>)

}


function isDigit(char) {
    return !isNaN(char) && char.trim() !== '';
  }


function getCodeStructure(sampleCode) {
    let letterCount = 0 
    let digitCount = 0
    let i = 0
    while (!isDigit(sampleCode[i])) {
        letterCount++
        i++
    }
    while (isDigit(sampleCode[i])) {
        digitCount++
        i++
    }

    return [letterCount, digitCount]
}


function getSiteStructure(sampleCode, sampleSite) {
    let ind = sampleSite.indexOf(sampleCode.toLowerCase())
    if (ind == -1) {
        //try "letters" + "/" + "numbers" 
        let i = 0
        while (i < sampleCode.length) {
            if (isDigit(sampleCode[i])) {
                break
            }
            i++
        }
        const startOfCode = sampleCode.slice(0, i)
        const endOfCode = sampleCode.slice(i)
        const newCode = startOfCode + "/" + endOfCode
        ind = sampleSite.indexOf(newCode.toLowerCase())
        if (ind == -1) {
            return ["", ""]
        }
    }

    const startOfSite = sampleSite.slice(0, ind)
    const endOfSite = sampleSite.slice(ind + sampleCode.length)
    

    return [startOfSite, endOfSite]
}


const getPrereqs = async (site, code) => {
    const toSend = {
        coursesite: site,
        coursecode: code
    }

    try {
        const { data } = await axios.post("http://127.0.0.1:5000/api/get_prereqs/", toSend, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(data.prerequisites)
        return data.prerequisites
    }
    catch (error) {
        console.error('Error:', error)
    }
}


export default InputCoursesForm