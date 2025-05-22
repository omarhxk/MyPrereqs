
function RegisterForm() {

    return(

        <form className="flex-grow justify-center mx-auto">
            <input type="email" placeholder="Email" className="rounded-2xl mx-auto shadow-xl w-80 ring-2 ring-slate-500 mt-5 p-2"/>
            <br/>
            <input type="password" placeholder="Password" className="rounded-2xl mx-auto shadow-xl w-80 ring-2 ring-slate-500 mt-5 p-2"/>
        </form>
    )
}

export default RegisterForm