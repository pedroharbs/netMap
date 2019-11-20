import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/password/ForgotPassword";
import ResetPassword from "../pages/password/ResetPassword";
import Dashboard from "../pages/dashboard/Dashboard";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/firstAccess" exact component={Register} />
        <Route path="/lostPassword" exact component={ForgotPassword} />
        <Route path="/resetPassword/:token" exact component={ResetPassword} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}
