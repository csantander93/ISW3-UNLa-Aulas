import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LatNavbar from '../elements/lat_navbar/LatNavbar.js';
import Navbar from '../elements/navbar/Navbar.js';
import { Screen } from "../views/Screen.js";
import { routes } from "./routes.js";
function AppRouter() {
    return (


        <Router>
            <Routes>
                <Route path='*' element={<Navigate to='/login' replace />} />
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={
                        <Screen
                            renderHeader={() => <Navbar></Navbar>}
                            renderLatNavbar={route.name === "Login" ? undefined : () => <LatNavbar />}
                            renderBody={() => <route.Component></route.Component>}
                        />}
                    />
                ))}
            </Routes>
        </Router>


    );
}

export default AppRouter;
