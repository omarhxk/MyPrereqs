import ModalHeader from './ModalHeader.jsx'
import ModalMessage from './ModalMessage.jsx'
import LoginForm from './LoginForm.jsx'

function LoginModal() {

    return(
        <div className="flex flex-col justify-center space-y-9 mx-auto w-3/4 h-100 bg-neutral-50 shadow-xl ring-2 ring-slate-50 rounded-2xl my-5">
            <ModalHeader text="Login"/>
            <ModalMessage text="Login to your account using your email!"/>
            <LoginForm/>
            <div className="flex justify-center">
                <button class="text-center rounded-4xl shadow-xl w-40 h-10 ring-2 mb-8 ring-blue-300 text-white mt-5 bg-blue-500 cursor-pointer">Sign In</button>
            </div>
        </div>
    )
}

export default LoginModal