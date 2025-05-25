import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'
import LoginForm from './LoginForm.jsx'
import { Link } from 'react-router-dom'

function LoginModal() {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-110 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl my-5">
            <ModalHeader text="Login"/>
            <ModalMessage text="Login to your account using your email!"/>
            <LoginForm/>
            <div className='flex justify-center space-x-2 mb-3'>
                <p>Don't have an account?</p>
                <Link to="/Register" className='text-gray-700 underline cursor-pointer'>Register</Link>
            </div>
        </div>
    )
}

export default LoginModal