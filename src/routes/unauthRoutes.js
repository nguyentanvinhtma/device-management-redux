import React from 'react';
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from '../pages/Loading/Loading';
import { RedirectLogin } from '../pages/404/RedirectLogin';

// import Loading from "../components/Loading/Loading";
// import { RedirectLogin } from "../pages/404/RedirectLogin";
// import { HandleJoin } from "../pages/Invite/HandleJoin";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import HandleForgotPassword from "../pages/ForgotPassword/HandleForgotPassword";
// import UpdatePassword from "../pages/ForgotPassword/UpdatePassword";
const Login = lazy(() => import("../pages/Login/Login"));

const UnauthRoutes = () => {
  return (
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path={'/login'} element={<Login />} />
          <Route path="*" element={<RedirectLogin />} />
        </Routes>
      </Suspense>
  );
};

export { UnauthRoutes };
