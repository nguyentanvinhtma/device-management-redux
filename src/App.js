import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import TodoList from "./components/TodoList";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

export default App;
