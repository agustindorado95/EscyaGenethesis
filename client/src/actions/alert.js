import { SET_ALERT, REMOVE_ALERT, SET_ALERT_IN_FORM, CLEAR_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id, inForm:false },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 1);
};

export const setAlertInForm = (msg, param) => (dispatch) => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT_IN_FORM,
        payload: { msg, param, id, inForm:true },
    });
};

export const clearAlert = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALERT
    });
};
