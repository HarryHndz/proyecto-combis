import { BrowserRouter, Route, Routes } from "react-router";
import Login  from "@/presentation/pages/auth/login/Login";
import Register from "@/presentation/pages/auth/register/Register";
import Profile from "@/presentation/pages/user/profile/Profile";
import Home from "@/presentation/pages/user/home/Home";
import Account from "@/presentation/pages/user/account/Account";
import DashboardUserLayout from "@/presentation/layouts/DashboardUserLayout";
import DasboardAdminLayout from "@/presentation/layouts/DasboardAdminLayout";
import Places from "@/presentation/pages/admin/place/index";
import AddPlace from "@/presentation/pages/admin/place/add";
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
          <Route path="places" index element={<Places />} />
          <Route path="add" index element={<AddPlace />} />
        </Route>
        <Route path="auth">
          <Route path="register" element={<Register />} />
          <Route index path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;