import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/password/ForgotPassword";
import ResetPassword from "../pages/password/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
// import Campi from "../pages/campi/Campi";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/firstAccess" exact component={Register} />
      <Route path="/lostPassword" exact component={ForgotPassword} />
      <Route path="/resetPassword/:token" exact component={ResetPassword} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/profile" exact component={Profile} />
    </BrowserRouter>
  );
}
