import axios from "axios";
import { setAlert, setAlertInForm } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    USER_LOADING,
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        dispatch({
            type: USER_LOADING
        });
        const res = await axios.get("/api/users/load");
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_FAIL,
        });
    }
};

export const register = ({ firstName, lastName, email, password }) => async (
    dispatch
) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ firstName, lastName, email, password });
    try {
        const res = await axios.post("/api/users/register", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = ({ email, password }) => async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post("/api/users/login", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};

export const updateProfile = ({ email, firstName, lastName, university, faculty, grade, selfIntro }) => async (
    dispatch
) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, firstName, lastName, university, faculty, grade, selfIntro });
    try {
        await axios.post("/api/users/me", body, config);
        dispatch(setAlert('用户信息已经成功修改。', "success"))
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlertInForm(err.msg, err.field)));
        }
    }
};