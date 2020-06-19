import axios from "axios";
import { setAlert, setAlertInForm } from "./alert";
import { setRedirect } from "./section";
import { LOAD_ARTICLE_START, LOAD_ARTICLE_SUCCESS, LOAD_ARTICLE_FAIL, CLEAR_ARTICLE_CACHE } from "./types";

export const loadArticle = (id) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_ARTICLE_START,
        });
        const res = await axios.get("/api/articles/" + id);
        dispatch({
            type: LOAD_ARTICLE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: LOAD_ARTICLE_FAIL,
        });
        dispatch(setRedirect('/articles'));
    }
};

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
            type: LOAD_ARTICLE_START,
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
        dispatch(setAlert('论文信息与设置修改成功。', "success"))
        dispatch({
            type: LOAD_ARTICLE_SUCCESS,
            payload: res.data,
        });
        dispatch(setRedirect('/articles'));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => {
                err.location === "banner" ? dispatch(setAlert(err.msg, "danger")) : dispatch(setAlertInForm(err.msg, err.param));
            });
        }
        dispatch({
            type: LOAD_ARTICLE_FAIL,
        });
    }
};

export const clearArticleCache = () => (dispatch) => {
    dispatch({
        type: CLEAR_ARTICLE_CACHE
    });
};
