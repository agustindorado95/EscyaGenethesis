import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import section from "./section";
import article from "./article";

export default combineReducers({ alert, auth, section, article });