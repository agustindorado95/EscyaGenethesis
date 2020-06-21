import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection, setRedirect } from "../../actions/section";
import { setAlert, clearAlert } from "../../actions/alert";
import { loadFocusArticle, updateChapter } from "../../actions/article";
import { inputField, textAreaField } from "../InputField";
import { v4 as uuidv4 } from "uuid";

const ChapterEdit = ({ alerts, setSection, setRedirect, setAlert, clearAlert, focusArticle, loadFocusArticle, updateChapter }) => {
    const { articleId, chapterId } = useParams();

    const [chapterContent, setChapterContent] = useState({ index: "", title: "", content: "", tailContent: "" });

    const setFieldData = (e) => {
        clearAlert();
        setChapterContent({
            ...chapterContent,
            [e.target.name]: e.target.value,
        });
    };

    const submitChapter = (e) => {
        e.preventDefault();
        clearAlert();
        updateChapter({ ...chapterContent, articleId, chapterId });
    };
    useEffect(() => {
        setSection("我的论文");
        clearAlert();
        loadFocusArticle(articleId);
    }, []);
    useEffect(() => {
        if (chapterId !== "new" && Object.keys(focusArticle).length > 0) {
            const chapter = focusArticle.chapters.filter((c) => c._id === chapterId)[0];
            if (chapter) {
                setChapterContent({
                    index: chapter.index,
                    title: chapter.title,
                    content: chapter.content,
                    tailContent: chapter.tailContent,
                });
                document.getElementById('chapter-identifier').innerHTML = `第${chapter.index}章：${chapter.title}`
            } else {
                setAlert("没有找到对应的章节。", "danger");
                setRedirect(`/dashboard/articles/${articleId}`);
            }
        } else {
            if (document.getElementById('chapter-identifier')) document.getElementById('chapter-identifier').innerHTML = `新章节`
        }
    }, [focusArticle]);

    if (Object.keys(focusArticle).length > 0) {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        <div className="card card-profile shadow">
                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <h3>当前论文目录</h3>
                            </div>
                            <div className="card-body pt-0 pt-md-2">
                                <div className="text-left">
                                    <p className="text-sm text-muted">摘要</p>
                                    <p className="text-sm text-muted">引入{focusArticle.introduction.title && `：${focusArticle.introduction.title}`}</p>
                                    {focusArticle.chapters.map((c) => (
                                        <Fragment key={c._id}>
                                            <p id={c._id} className="text-sm text-muted" style={{marginLeft:`${(c.index.split(".").length - 1)*2}rem`}}>
                                                第{c.index}章：{c.title}
                                            </p>
                                        </Fragment>
                                    ))}
                                    <p className="text-sm text-muted">致谢辞</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8 order-xl-1">
                        <div className="card bg-secondary shadow">
                            <div className="card-header bg-white border-0">
                                    <h3 className="mb-0" id="chapter-identifier">新章节</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitChapter}>
                                    <h6 className="heading-small text-muted mb-4">章节基本信息</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-index">
                                                        章节序号
                                                    </label>
                                                    {inputField(chapterContent, setFieldData, alerts, "index", "a.b.c", "text", { required: true })}
                                                </div>
                                            </div>
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-title">
                                                        章节标题
                                                    </label>
                                                    {inputField(chapterContent, setFieldData, alerts, "title", "章节标题", "text", { required: true })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">章节内容</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">
                                                        章节内容
                                                    </label>
                                                    {textAreaField(chapterContent, setFieldData, alerts, "content", "章节内容", { rows: 5 })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">
                                                        章节尾部内容
                                                    </label>
                                                    {textAreaField(chapterContent, setFieldData, alerts, "tailContent", "章节尾部内容", { rows: 5 })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Link to={`/dashboard/articles/${articleId}`} className="btn btn-secondary btn-lg">
                                            返回
                                        </Link>
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            {chapterId === "new" ? "新建章节" : "修改章节"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    } else {
        return null;
    }
};

ChapterEdit.propTypes = {
    setSection: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    setRedirect: PropTypes.func.isRequired,
    focusArticle: PropTypes.object.isRequired,
    loadFocusArticle: PropTypes.func.isRequired,
    updateChapter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    alerts: state.alert,
    focusArticle: state.article.focusArticle,
});
export default connect(mapStateToProps, { setSection, setAlert, clearAlert, setRedirect, loadFocusArticle, updateChapter })(ChapterEdit);
