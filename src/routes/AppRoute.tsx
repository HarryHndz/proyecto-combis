import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="auth">
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;