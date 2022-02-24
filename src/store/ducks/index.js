import { combineReducers } from "redux";

import devices from "./devices";
import auth from "./auth";

export default combineReducers({
  devices,
  auth
});
