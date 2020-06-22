import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection, setRedirect } from "../../actions/section";
import { setAlert, clearAlert } from "../../actions/alert";
import { loadFocusArticle, updateChapter } from "../../actions/article";
import { inputField, textAreaField } from "../InputField";
import { sideStructurePreview } from "../SideStructurePreview";

const ChapterEdit = ({ alerts, setSection, setRedirect, setAlert, clearAlert, focusArticle, loadFocusArticle, updateChapter }) => {
    const { articleId, chapterId } = useParams();

    const [chapterContent, setChapterContent] = useState({ index: "", title: "", hideIndex: false, content: "", tailContent: "" });

    const setFieldData = (e) => {
        alerts.length > 0 && clearAlert();
        e.target.type === "checkbox"
            ? setChapterContent({
                  ...chapterContent,
                  [e.target.name]: e.target.checked,
              })
            : setChapterContent({
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
                    hideIndex: chapter.hideIndex,
                    title: chapter.title,
                    content: chapter.content,
                    tailContent: chapter.tailContent,
                });
                document.getElementById("chapter-identifier").innerHTML = `第${chapter.index}章：${chapter.title}`;
            } else {
                setAlert("没有找到对应的章节。", "danger");
                setRedirect(`/dashboard/articles/${articleId}`);
            }
        } else {
            if (document.getElementById("chapter-identifier")) document.getElementById("chapter-identifier").innerHTML = `新章节`;
        }
    }, [focusArticle]);

    if (Object.keys(focusArticle).length > 0) {
        return (
            <Fragment>
                <div className="row">
                    {sideStructurePreview(focusArticle)}

                    <div className="col-xl-8 order-xl-1">
                        <div className="card bg-secondary shadow">
                            <div className="card-header bg-white border-0">
                                <h3 className="mb-0" id="chapter-identifier">
                                    新章节
                                </h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitChapter}>
                                    <h6 className="heading-small text-muted mb-4">章节基本信息</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-index">
                                                        章节序号
                                                    </label>
                                                    {inputField(chapterContent, setFieldData, alerts, "index", "a.b.c", "text", { required: true })}
                                                </div>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-title">
                                                        章节标题
                                                    </label>
                                                    {inputField(chapterContent, setFieldData, alerts, "title", "章节标题", "text", { required: true })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="hideIndex"
                                                name="hideIndex"
                                                checked={chapterContent.hideIndex}
                                                onChange={setFieldData}
                                            />
                                            <label className="custom-control-label text-muted" htmlFor="hideIndex">
                                                隐藏章节序号
                                            </label>
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
                                        <Link to={`/dashboard/articles/${articleId}`} className="btn btn-secondary btn-lg ml-3">
                                        <i className="far fa-undo-alt pr-2"></i>返回
                                        </Link>
                                        <button type="submit" className="btn btn-success btn-lg ml-3">
                                        <i className="far fa-check pr-2"></i>{chapterId === "new" ? "新建章节" : "修改章节"}
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
