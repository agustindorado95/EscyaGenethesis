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

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: {
        firstName: '加载中...',
        lastName: '',
        avatar: 'default.jpg',
        timeCreated: new Date(),
    },
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case USER_LOADING:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case AUTH_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {
                    firstName: '',
                    lastName: '',
                    avatar: 'default.jpg'
                },
            };

        default:
            return state;
    }
};
