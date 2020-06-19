import { LOAD_ARTICLE_START, LOAD_ARTICLE_SUCCESS, LOAD_ARTICLE_FAIL, CLEAR_ARTICLE_CACHE } from "../actions/types";

const initialState = {
    loading: false,
    content: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_ARTICLE_START:
            return {
                ...state,
                loading: true,
            };
        case LOAD_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                content: payload
            };
        case LOAD_ARTICLE_FAIL:
        case CLEAR_ARTICLE_CACHE:
            return {
                loading: false,
                content: {}
            }
        default:
            return state;
    }
};
