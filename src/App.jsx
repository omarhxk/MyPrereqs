import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import NoPage from './Pages/NoPage'
import Register from "./Pages/Register"

const App = function() {
    
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App
