import { BrowserRouter, Route, Routes } from "react-router";
import Login  from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import Profile from "@/pages/profile/Profile";
import Home from "@/pages/home/Home";



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