import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import section from "./section";

export default combineReducers({ alert, auth, section });