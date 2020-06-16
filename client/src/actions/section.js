import { SET_SECTION } from "./types";

export const setSection = (section) => (dispatch) => {

    dispatch({
        type: SET_SECTION,
        payload: section,
    });

};