import { useEffect, useState } from "react"
import supabase from "../supabase-client"
import { Navigate } from "react-router-dom"

function Wrapper({ children }) {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const {data: {session}} = await supabase.auth.getSession()
            setAuth(!!session) //true if session, false if null
            setLoading(false)
        }
    })

    if (auth) {
        return <>{children}</>
    }
    else {
        return <Navigate to="/Login"/>
    }
}

export default Wrapper