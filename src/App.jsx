import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import NoPage from './Pages/NoPage'
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Wrapper from './Components/Wrapper'

const App = function() {
    
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Wrapper> <Home/> </Wrapper>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App
