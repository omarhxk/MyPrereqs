import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import NoPage from './Pages/NoPage'

const App = function() {
    
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App
