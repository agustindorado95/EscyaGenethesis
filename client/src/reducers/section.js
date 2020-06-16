import { SET_SECTION } from "../actions/types";
const initialState = '用户信息';

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SECTION:
            return payload;
        default:
            return state;
    }
};