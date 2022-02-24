import React, { Fragment } from 'react';
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../store";
import DeviceList from "../components/DeviceManagement";

import Loading from '../pages/Loading/Loading';
import Nav from '../components/Nav/Nav';

import { PageNotFound } from '../pages/404/PageNotFound';
const Chart = lazy(() => import("../pages/Chart/Chart"));

const AuthRoutes = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Nav />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path={'/'} element={<DeviceList />} />
            <Route exact path={'/chart'} element={<Chart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Fragment>
    </Provider>
  );
};

export { AuthRoutes };