import { SET_SECTION, SET_REDIRECT } from "../actions/types";
const initialState = { currentSection: "我的信息", redirect: null };

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SECTION:
            return { ...state, currentSection: payload, redirect:null };
        case SET_REDIRECT:
            return { ...state, redirect: payload };
        default:
            return state;
    }
};
