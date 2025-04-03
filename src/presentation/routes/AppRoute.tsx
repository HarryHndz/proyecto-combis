import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/presentation/pages/auth/login/Login";
import Register from "@/presentation/pages/auth/register/Register";
import Profile from "@/presentation/pages/user/profile/Profile";
import Home from "@/presentation/pages/user/home/Home";
import Account from "@/presentation/pages/user/account/Account";
import DashboardUserLayout from "@/presentation/layouts/DashboardUserLayout";
import DasboardAdminLayout from "@/presentation/layouts/DasboardAdminLayout";
import Places from "@/presentation/pages/admin/place/index";
import AddPlace from "@/presentation/pages/admin/place/add";
import Drivers from "@/presentation/pages/admin/drivers/index";
import AddDriver from "../pages/admin/drivers/add";
import UpdateDriver from "../pages/admin/drivers/update";
import DetailsDriver from "../pages/admin/drivers/detail";
import Transport from "@/presentation/pages/admin/transport/Transport";
import RegisterCombis from "@/presentation/pages/admin/transport/RegisterCombis";
import UpdateCombis from "@/presentation/pages/admin/transport/update";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user" element={<DashboardUserLayout />}>
          <Route path="home" index element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="admin" element={<DasboardAdminLayout />}>
          <Route path="places">
            <Route index element={<Places />} />
            <Route path="add" index element={<AddPlace />} />
          </Route>
          <Route path="transport">
            <Route path="register" element={<RegisterCombis />} />
            <Route path="update" element={<UpdateCombis />} />
            <Route index element={<Transport />} />
          </Route>
          <Route path="drivers">
            <Route index element={<Drivers />} />
            <Route path="new" index element={<AddDriver />} />
            <Route path="modify/:id" index element={<UpdateDriver />} />
            <Route path="details/:id" index element={<DetailsDriver />} />
          </Route>          
        </Route>
        <Route path="auth">
          <Route path="register" element={<Register />} />
          <Route index path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
