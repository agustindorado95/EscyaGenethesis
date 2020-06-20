import axios from "axios";
import { setAlert, setAlertInForm } from "./alert";
import { setRedirect } from "./section";
import {
    ARTICLE_LOADING_START,
    ARTICLE_LOADING_END,
    LOAD_USER_ARTICLES_SUCCESS,
    LOAD_USER_ARTICLES_FAIL,
    LOAD_FOCUS_ARTICLE_SUCCESS,
    LOAD_FOCUS_ARTICLE_FAIL,
} from "./types";

export const loadUserArticles = () => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const res = await axios.get("/api/articles");
        dispatch({
            type: LOAD_USER_ARTICLES_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: ARTICLE_LOADING_END,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: LOAD_USER_ARTICLES_FAIL,
        });
    }
};

export const loadFocusArticle = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const res = await axios.get("/api/articles/" + id);
        dispatch({
            type: LOAD_FOCUS_ARTICLE_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: ARTICLE_LOADING_END,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: LOAD_FOCUS_ARTICLE_FAIL,
        });
        dispatch(setRedirect("/dashboard/articles"));
    }
};

export const clearFocusArticle = () => (dispatch) => {
    dispatch({
        type: LOAD_FOCUS_ARTICLE_SUCCESS,
        payload: {},
    });
}

export const updateArticle = ({
    ref,
    language,
    tutor,
    title,
    titleSecondLanguage,
    subTitle,
    subTitleSecondLanguage,
    keywords,
    keywordsSecondLanguage,
    font,
    fontSecondLanguage,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    headingFontSize,
    bodyFontSize,
    imageCommentFontSize,
    referenceFontSize,
    bibliographyFontSize,
    tocFontSize,
    headingLineSpacing,
    tocLineSpacing,
    bodyLineSpacing,
    imageCommentLineSpacing,
    referenceLineSpacing,
    bibliographyLineSpacing,
    headingAfterSpacing,
    bodyAfterSpacing,
    tocIndentGrowth,
    bodyIndent,
}) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify({
            language,
            tutor,
            title,
            titleSecondLanguage,
            subTitle,
            subTitleSecondLanguage,
            keywords,
            keywordsSecondLanguage,
            font,
            fontSecondLanguage,
            marginLeft,
            marginRight,
            marginTop,
            marginBottom,
            headingFontSize,
            bodyFontSize,
            imageCommentFontSize,
            referenceFontSize,
            bibliographyFontSize,
            tocFontSize,
            headingLineSpacing,
            tocLineSpacing,
            bodyLineSpacing,
            imageCommentLineSpacing,
            referenceLineSpacing,
            bibliographyLineSpacing,
            headingAfterSpacing,
            bodyAfterSpacing,
            tocIndentGrowth,
            bodyIndent,
        });
        const res = await axios.post("/api/articles/" + ref, body, config);
        dispatch(setAlert("论文信息与设置修改成功。", "success"));
        dispatch({
            type: LOAD_FOCUS_ARTICLE_SUCCESS,
            payload: res.data,
        });
        dispatch({
            type: ARTICLE_LOADING_END,
        });
        dispatch(setRedirect("/dashboard/articles"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: LOAD_FOCUS_ARTICLE_FAIL,
        });
    }
};

export const markArticleStatus = ({ id, status }) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify({status})
        const res = await axios.put(`/api/articles/${id}/markstatus`, body, config);
        dispatch(setAlert(`论文 ${res.data.title} 的状态已成功更改。`, "success"))
        dispatch(loadUserArticles());
    } catch (error) {
        console.log(error)
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: ARTICLE_LOADING_END,
        });
        // dispatch(setRedirect("/dashboard/articles"));
    }
};
