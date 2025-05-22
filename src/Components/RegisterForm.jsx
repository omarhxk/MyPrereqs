import React, { useState } from "react"
import supabase from '../supabase-client.js'

function RegisterForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
     
    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage("")

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            setMessage(error.message)
            return;
        }

        if (data) {
            setMessage("Account created!")
            return;
        }

        setEmail("")
        setPassword("")
    }

    return(


        <form className="flex-grow justify-center mx-auto" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="rounded-2xl mx-auto shadow-xl w-80 ring-2 ring-slate-500 mt-5 p-2"
            onChange={(e) => setEmail(e.target.value)} value={email} required/>
            <br/>
            <input type="password" placeholder="Password" className="rounded-2xl mx-auto shadow-xl w-80 ring-2 ring-slate-500 mt-5 p-2"
            onChange={(e) => setPassword(e.target.value)} value={password} required/>
            <br/>
            <div className="flex justify-center my-3">
                {message && <p>{message}</p>}
            </div>
            <div className="flex justify-center">
                <button className="text-center rounded-4xl shadow-xl w-40 h-10 ring-2 mt-8 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer">Sign Up</button>
            </div>
        </form>
    )
}

export default RegisterForm