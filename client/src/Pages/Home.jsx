import Header from '../Components/Header.jsx'
import Courses from '../Components/Courses.jsx'
import Logout from '../Components/Logout.jsx'
import InputCoursesModal from '../Components/InputCoursesModal.jsx'
import { useState, useEffect } from 'react'
import supabase from '../supabase-client.js'

function Home() {
    
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

    useEffect(() => {
        const checkOnboardStatus = async () => {
            const {
                data: { user }, 
                error: authError
            } = await supabase.auth.getUser() //getting user id
        

            if (authError || !user) {
                console.error("Error fetching user:", authError)
                return
            }

            //checking if user has completed onboarding
            const { data, error } = await supabase
            .from("Profiles")
            .select("has_completed_onboarding")
            .eq("user_id", user.id)
            .single()

            if (error) {
                console.log("Error fetching user's onboard status:", error)
                return
            }

            if (data.has_completed_onboarding) {
                setHasCompletedOnboarding(true)
            }
        }

        checkOnboardStatus()
    }, [])


    return(
    <>
       <Header/>
       {hasCompletedOnboarding ? <Courses/> : <InputCoursesModal setHasCompletedOnboarding={setHasCompletedOnboarding}/>}
       <Logout/>
    </>


    )
}

export default Home