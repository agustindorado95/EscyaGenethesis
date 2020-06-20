import {
    ARTICLE_LOADING_START,
    ARTICLE_LOADING_END,
    LOAD_USER_ARTICLES_SUCCESS,
    LOAD_USER_ARTICLES_FAIL,
    LOAD_FOCUS_ARTICLE_SUCCESS,
    LOAD_FOCUS_ARTICLE_FAIL,
} from "../actions/types";

const initialState = {
    loading: false,
    userArticles: [],
    focusArticle: {},
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ARTICLE_LOADING_START:
            return {
                ...state,
                loading: true,
            };
        case LOAD_USER_ARTICLES_SUCCESS:
            return {
                ...state,
                userArticles: payload,
            };
        case LOAD_FOCUS_ARTICLE_SUCCESS:
            return {
                ...state,
                focusArticle: payload,
            };
        case LOAD_USER_ARTICLES_FAIL:
            return {
                ...state,
                loading: false,
                userArticles: [],
            };
        case LOAD_FOCUS_ARTICLE_FAIL:
            return {
                ...state,
                loading: false,
                focusArticle: {},
            };
        case ARTICLE_LOADING_END:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
