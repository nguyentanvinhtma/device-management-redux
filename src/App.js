import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";

import store from "./store";

import { UnauthRoutes } from "./routes/unauthRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import "./App.css";


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false
    };
  }

  render() {
    return <Provider store={store}>
      <BrowserRouter>
        {this.state.isAuthenticated ? <AuthRoutes /> : <UnauthRoutes />}
      </BrowserRouter>
    </Provider>
  }
}

export default App;
