import { SET_ALERT, SET_ALERT_IN_FORM, REMOVE_ALERT, CLEAR_ALERT } from "../actions/types";
const initialState = [];

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
        case SET_ALERT_IN_FORM:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        case CLEAR_ALERT:
            return []
        default:
            return state;
    }
};