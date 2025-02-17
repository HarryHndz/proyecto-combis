import { BrowserRouter, Route, Routes } from "react-router";
import Login  from "@/presentation/pages/auth/login/Login";
import Register from "@/presentation/pages/auth/register/Register";
import Profile from "@/presentation/pages/profile/Profile";
import Home from "@/presentation/pages/home/Home";



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