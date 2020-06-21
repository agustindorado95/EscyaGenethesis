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

export const loadFocusArticle = (articleId) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const res = await axios.get(`/api/articles/${articleId}`);
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
};

export const updateArticle = ({
    articleId,
    mainLanguage,
    tutor,
    title,
    subTitle,
    keywords,
    font,
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
    abstract,
    bibliography,
    gratitude
}) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify({
            mainLanguage,
            tutor,
            title,
            subTitle,
            keywords,
            font,
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
            abstract,
            bibliography,
            gratitude
        });
        const res = await axios.post(`/api/articles/${articleId}`, body, config);
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

export const markArticleStatus = ({ articleId, status }) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify({ status });
        const res = await axios.put(`/api/articles/${articleId}/markstatus`, body, config);
        dispatch(setAlert(`论文 ${res.data.title[0].value} 的状态已成功更改。`, "success"));
        dispatch(loadUserArticles());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: ARTICLE_LOADING_END,
        });
    }
};

export const deleteArticle = ({ articleId }) => async (dispatch) => {
    try {
        const c = confirm("您确定要删除这篇论文吗？");
        if (c) {
            dispatch({
                type: ARTICLE_LOADING_START,
            });
            await axios.delete(`/api/articles/${articleId}`);
            dispatch(setAlert("论文删除成功。", "success"));
            dispatch({
                type: ARTICLE_LOADING_END,
            });
            dispatch(loadUserArticles());
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: ARTICLE_LOADING_END,
        });
    }
};

export const updateChapter = ({ articleId, chapterId, index, title, content, tailContent }) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_LOADING_START,
        });
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify({
            index,
            title,
            content,
            tailContent,
        });
        await axios.post(`/api/articles/${articleId}/chapters/${chapterId}`, body, config);
        dispatch(setAlert("章节信息与内容修改成功。", "success"));
        dispatch(setRedirect(`/dashboard/articles/${articleId}`));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: ARTICLE_LOADING_END,
        });
    }
};

export const deleteChapter = ({ articleId, chapterId }) => async (dispatch) => {
    try {
        const c = confirm("您确定要删除这一章节吗？");
        if (c) {
            dispatch({
                type: ARTICLE_LOADING_START,
            });
            const res = await axios.delete(`/api/articles/${articleId}/chapters/${chapterId}`);
            dispatch(setAlert("章节删除成功。", "success"));
            dispatch({
                type: LOAD_FOCUS_ARTICLE_SUCCESS,
                payload: res.data,
            });
            dispatch({
                type: ARTICLE_LOADING_END,
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: ARTICLE_LOADING_END,
        });
    }
};
