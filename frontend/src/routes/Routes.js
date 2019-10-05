import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

<<<<<<< HEAD:frontend/src/routes/Routes.js
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/password/ForgotPassword";
import ResetPassword from "../pages/password/ResetPassword";
import Dashboard from "../pages/Dashboard";
=======
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LostPassword from "./pages/password/LostPassword";
import ResetPassword from "./pages/password/ResetPassword";
>>>>>>> master:frontend/src/routes.js

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/firstAccess" exact component={Register} />
      <Route path="/lostPassword" exact component={LostPassword} />
      <Route path="/resetPassword/:token" exact component={ResetPassword} />
<<<<<<< HEAD:frontend/src/routes/Routes.js
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
=======
>>>>>>> master:frontend/src/routes.js
    </BrowserRouter>
  );
}
