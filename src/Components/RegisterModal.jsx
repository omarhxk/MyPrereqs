import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'
import RegisterForm from './RegisterForm.jsx'
import { Link } from 'react-router-dom'

function RegisterModal() {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-110 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl my-5">
            <ModalHeader text="Register"/>
            <ModalMessage text="Sign up for an account using your email!"/>
            <RegisterForm/>
            <div className='flex justify-center space-x-2 mb-3'>
                <p>Already have an account?</p>
                <Link to="/Login" className='text-gray-700 underline cursor-pointer'>Log in</Link>
            </div>
            
        </div>
    )
}

export default RegisterModal