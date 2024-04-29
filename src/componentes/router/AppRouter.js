import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "../main/Login.js";

import Home from "../home/Home.js";
import Body from "../main/BodyPrincipal.js";
import Register from "../main/Register.js";
function AppRouter() {
    return (


        <Router>
            <Routes>
                <Route path='*' element={<Navigate to='/login' replace />} />
                <Route path="/login" element={<Body><Login /></Body>} />
                <Route path="/register" element={<Body><Register /> </Body>} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>


    );
}

export default AppRouter;
