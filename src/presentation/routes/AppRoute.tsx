import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/presentation/pages/auth/login/Login";
import Register from "@/presentation/pages/auth/register/Register";
import Profile from "@/presentation/pages/profile/Profile";
import Home from "@/presentation/pages/home/Home";
import DashboardLayoutScreen from "../pages/layout/Dashboard";
import Account from "@/presentation/pages/account/Account";
import Transport from "@/presentation/pages/transport/Transport";
import RegisterCombis from "@/presentation/pages/transport/Register/RegisterCombis";
import UpdateCombis from "@/presentation/pages/transport/update/update";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayoutScreen />}>
          <Route path="home" index element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="transport" element={<Transport />}>
          </Route>
          
        <Route path="transport/register" element={<RegisterCombis />} />
        <Route path="transport/update" element={<UpdateCombis />} />

        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
