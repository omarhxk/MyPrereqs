import supabase from '../supabase-client.js'
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate()

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error
        }
        navigate("/login")
    }

    return(
        <div className="flex justify-center">
            <button onClick={signOut} className='text-gray-700 underline cursor-pointer'>Logout</button>
        </div>
    )

}

export default Logout