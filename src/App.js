import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import DeviceList from "./components/DeviceManagement";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <DeviceList />
  </Provider>
);

export default App;
