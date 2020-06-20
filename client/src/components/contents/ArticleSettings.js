import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { inputField, selectField } from "../InputField";
import { loadFocusArticle, updateArticle } from "../../actions/article";
import { setSection } from "../../actions/section";

const ArticleSettings = ({ alerts, focusArticle, loadFocusArticle, updateArticle, setSection }) => {
    const [proMode, setProMode] = useState(false);
    const init = {
        language: "zh",
        tutor: "",
        title: "",
        titleSecondLanguage: "",
        subTitle: "",
        subTitleSecondLanguage: "",
        keywords: "",
        keywordsSecondLanguage: "",
        font: "Times New Roman",
        fontSecondLanguage: "Times New Roman",
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 2,
        headingFontSize: 12,
        bodyFontSize: 12,
        imageCommentFontSize: 10,
        referenceFontSize: 10,
        bibliographyFontSize: 12,
        tocFontSize: 12,
        headingLineSpacing: 1.5,
        tocLineSpacing: 1.5,
        bodyLineSpacing: 1.5,
        imageCommentLineSpacing: 1.5,
        referenceLineSpacing: 1.5,
        bibliographyLineSpacing: 1.5,
        headingAfterSpacing: 10,
        bodyAfterSpacing: 5,
        tocIndentGrowth: 0.74,
        bodyIndent: 0.74,
    };
    const [formData, setFormData] = useState(init);

    const { ref } = useParams();

    useEffect(() => {
        setSection("我的论文");
        if (ref !== "new") {
            loadFocusArticle(ref);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(focusArticle).length > 0) {
            const newState = formData;
            Object.keys(init).forEach((key) => {
                newState[key] = focusArticle[key];
            });
            setFormData(newState);
        }
    }, [focusArticle]);

    const setFieldData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        updateArticle({ ...formData, ref: ref });
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-12 order-xl-1">
                    <div className="card bg-secondary shadow">
                        <div className="card-header bg-white border-0">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-2">论文设置</h3>
                                    <small className="text-muted">系统已经内置了一套通用排版设置。如果有特殊需求，可以打开高级模式，自定义文档样式。</small>
                                </div>
                                <div className="col-4 text-right">
                                    <label className="switch">
                                        <input type="checkbox" className="input-toggle" onChange={() => setProMode(!proMode)} />
                                        <span className="slider round"></span>
                                    </label>
                                    <h5 className="mb-0 pb-0 text-sm">高级模式</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <h6 className="heading-small text-muted mb-4">论文基本信息</h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-1">
                                                <label className="form-control-label" htmlFor="title">
                                                    论文标题
                                                </label>
                                                {inputField(formData, setFieldData, alerts, "title", "论文标题", "text", { required: true })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mt-1">
                                                {inputField(formData, setFieldData, alerts, "titleSecondLanguage", "论文第二语言标题（可选）", "text")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-1">
                                                <label className="form-control-label" htmlFor="subTitle">
                                                    论文副标题（可选）
                                                </label>
                                                {inputField(formData, setFieldData, alerts, "subTitle", "论文副标题（可选）", "text")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mt-1">
                                                {inputField(formData, setFieldData, alerts, "subTitleSecondLanguage", "论文第二语言副标题（可选）", "text")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="tutor">
                                                    导师
                                                </label>
                                                {inputField(formData, setFieldData, alerts, "tutor", "导师", "text")}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="language">
                                                    语言
                                                </label>
                                                {selectField(formData, setFieldData, alerts, "language", "语言", [
                                                    { value: "es", text: "西班牙语" },
                                                    { value: "zh", text: "中文" },
                                                ])}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="keywords">
                                                    关键词
                                                </label>
                                                {inputField(formData, setFieldData, alerts, "keywords", "关键词1，关键词2，关键词3……", "text")}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="keywordsSecondLanguage">
                                                    第二语言关键词（可选）
                                                </label>
                                                {inputField(formData, setFieldData, alerts, "keywordsSecondLanguage", "关键词1，关键词2，关键词3……", "text")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4" />

                                <div id="pro-mode" className={proMode ? "" : "no-display"}>
                                    <h6 className="heading-small text-muted mb-4">页边距设置</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            {[
                                                { label: "上方页边距", fieldName: "marginTop" },
                                                { label: "下方页边距", fieldName: "marginBottom" },
                                                { label: "左侧页边距", fieldName: "marginLeft" },
                                                { label: "右侧页边距", fieldName: "marginRight" },
                                            ].map((obj) => (
                                                <div className="col-md-3" key={obj.fieldName}>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor={obj.fieldName}>
                                                            {obj.label}
                                                        </label>
                                                        {inputField(formData, setFieldData, alerts, obj.fieldName, obj.label, "number", { required: true })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">字体与字号设置</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            {[
                                                { label: "字体", fieldName: "font" },
                                                { label: "第二语言字体", fieldName: "fontSecondLanguage" },
                                            ].map((obj) => (
                                                <div className="col-md-3" key={obj.fieldName}>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor={obj.fieldName}>
                                                            {obj.label}
                                                        </label>
                                                        {selectField(formData, setFieldData, alerts, obj.fieldName, "字体", [
                                                            { value: "Times New Roman", text: "Times New Roman" },
                                                            { value: "Helvetica", text: "Helvetica" },
                                                            { value: "SongTi", text: "宋体" },
                                                            { value: "HeiTi", text: "黑体" },
                                                        ])}
                                                    </div>
                                                </div>
                                            ))}
                                            {[
                                                { label: "章节标题字号", fieldName: "headingFontSize" },
                                                { label: "正文字号", fieldName: "bodyFontSize" },
                                                { label: "图片说明字号", fieldName: "imageCommentFontSize" },
                                                { label: "脚注字号", fieldName: "referenceFontSize" },
                                                { label: "参考书目字号", fieldName: "bibliographyFontSize" },
                                                { label: "目录字号", fieldName: "tocFontSize" },
                                            ].map((obj) => (
                                                <div className="col-md-3" key={obj.fieldName}>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor={obj.fieldName}>
                                                            {obj.label}
                                                        </label>
                                                        {inputField(formData, setFieldData, alerts, obj.fieldName, obj.label, "number", { required: true })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">行距与缩进设置</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            {[
                                                { label: "章节标题行距", fieldName: "headingLineSpacing" },
                                                { label: "目录行距", fieldName: "tocLineSpacing" },
                                                { label: "正文行距", fieldName: "bodyLineSpacing" },
                                                { label: "图片说明行距", fieldName: "imageCommentLineSpacing" },
                                                { label: "脚注行距", fieldName: "referenceLineSpacing" },
                                                { label: "参考书目行距", fieldName: "bibliographyLineSpacing" },
                                                { label: "章节标题段后距", fieldName: "headingAfterSpacing" },
                                                { label: "正文段后距", fieldName: "bodyAfterSpacing" },
                                            ].map((obj) => (
                                                <div className="col-md-3" key={obj.fieldName}>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor={obj.fieldName}>
                                                            {obj.label}
                                                        </label>
                                                        {inputField(formData, setFieldData, alerts, obj.fieldName, obj.label, "number", { required: true })}
                                                    </div>
                                                </div>
                                            ))}
                                            {[
                                                { label: "目录等级缩进差", fieldName: "tocIndentGrowth" },
                                                { label: "正文首行缩进", fieldName: "bodyIndent" },
                                            ].map((obj) => (
                                                <div className="col-md-3" key={obj.fieldName}>
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor={obj.fieldName}>
                                                            {obj.label}
                                                        </label>
                                                        {inputField(formData, setFieldData, alerts, obj.fieldName, obj.label, "number", { required: true })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </div>

                                <div className="text-right">
                                    <Link to="/dashboard/articles" className="btn btn-secondary btn-lg mr-3">
                                        返回
                                    </Link>
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        确认信息
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ArticleSettings.propTypes = {
    alerts: PropTypes.array.isRequired,
    focusArticle: PropTypes.object.isRequired,
    loadFocusArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
    setSection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
    focusArticle: state.article.focusArticle,
});

export default connect(mapStateToProps, { loadFocusArticle, updateArticle, setSection })(ArticleSettings);
