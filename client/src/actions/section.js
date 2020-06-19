import { SET_SECTION, SET_REDIRECT } from "./types";

export const setSection = (section) => (dispatch) => {

    dispatch({
        type: SET_SECTION,
        payload: section,
    });

};

export const setRedirect = (link) => (dispatch) => {

    dispatch({
        type: SET_REDIRECT,
        payload: link,
    });

};