import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetPassword from "./pages/password/ResetPassword";
import Dashboard from "./pages/Dashboard";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/firstAccess" exact component={Register} />
      <Route path="/lostPassword" exact component={ForgotPassword} />
      <Route path="/resetPassword/:token" exact component={ResetPassword} />
      <Route path="/dashboard" exact component={Dashboard} />
    </BrowserRouter>
  );
}
