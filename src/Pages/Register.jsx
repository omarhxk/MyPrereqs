import supabase from '../supabase-client.js'
import Header from '../Components/Header.jsx'

const register = async (email, password) => {
    const {} = await supabase
}

function Register() {

    return( 
        <div>
            <Header/>
            <input type='email' id='email' placeholder='Email'/>
            <input type='password' id='password' placeholder='Password'/>
            <button class="font-medium" onClick={ () => register(email, password)}>Sign Up</button>
        </div>
    )
}

export default Register