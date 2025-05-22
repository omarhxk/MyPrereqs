import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'
import RegisterForm from './RegisterForm.jsx'

function RegisterModal() {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-100 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl my-5">
            <ModalHeader text="Register"/>
            <ModalMessage text="Sign up for an account using your email!"/>
            <RegisterForm/>
            <div className="flex justify-center">
                <button class="text-center rounded-4xl shadow-xl w-40 h-10 ring-2 mb-8 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer">Sign Up</button>
            </div>
        </div>
    )
}

export default RegisterModal