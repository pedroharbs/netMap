import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import LostPassword from './pages/password/LostPassword';
import ResetPassword from './pages/password/ResetPassword';

export default function Routes(){
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/firstAccess" component={Register} />
      <Route path="/lostPassword" component={LostPassword} />
      <Route path="/resetPassword" component={ResetPassword} />
    </BrowserRouter>
  )
}