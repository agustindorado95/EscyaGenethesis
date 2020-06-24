import React, { useEffect, useState, Fragment, Component } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection, setRedirect } from "../../actions/section";
import { setAlert, clearAlert } from "../../actions/alert";
import { loadFocusArticle, updateChapter } from "../../actions/article";
import { inputField } from "../InputField";
import { sideStructurePreview } from "../SideStructurePreview";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, convertFromRaw, Modifier, CompositeDecorator } from "draft-js";

class CustomOption extends Component {
    static propTypes = {
        footnoteKey: PropTypes.string,
        onChange: PropTypes.func,
        editorState: PropTypes.object,
    };

    addFootnote = (text) => {
        const { editorState, onChange, footnoteKey } = this.props;
        const contentState = Modifier.applyEntity(editorState.getCurrentContent(), editorState.getSelection(), footnoteKey);
        onChange(EditorState.push(editorState, contentState, "apply-entity"));
    };

    render() {
        return (
            <Fragment>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    脚注生成
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input id="footnote-generator-comment" className="form-control form-control-alternative" placeholder="comment" type="text" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    关闭
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        this.addFootnote(document.getElementById("footnote-generator-comment").value);
                                    }}
                                >
                                    添加脚注
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={this.addFootnote}>
                    <i className="pl-2 far fa-pen-nib"></i>
                </div>
            </Fragment>
        );
    }
}

const FootnoteSpan = (props) => {
    console.log(props);
    return (
        <span {...props} style={{ color: "red" }}>
            1
        </span>
    );
};
function findFootnoteEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        entityKey && console.log(contentState.getEntity(entityKey).getType());
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "FOOTNOTE";
    }, callback);
}

const ChapterEdit = ({ alerts, setSection, setRedirect, setAlert, clearAlert, focusArticle, loadFocusArticle, updateChapter }) => {
    const { articleId, chapterId } = useParams();

    const [chapterInfo, setChapterInfo] = useState({ index: "", title: "", hideIndex: false });

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [footnoteKey, setFootnoteKey] = useState(null);

    const onChange = (v) => {
        setEditorState(v);
    };

    const setFieldData = (e) => {
        alerts.length > 0 && clearAlert();
        e.target.type === "checkbox"
            ? setChapterInfo({
                  ...chapterInfo,
                  [e.target.name]: e.target.checked,
              })
            : setChapterInfo({
                  ...chapterInfo,
                  [e.target.name]: e.target.value,
              });
    };

    const submitChapter = (e) => {
        e.preventDefault();
        clearAlert();
        const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        updateChapter({ ...chapterInfo, articleId, chapterId, content: raw });
    };

    const compositeDecorator = new CompositeDecorator([
        {
            strategy: findFootnoteEntities,
            component: FootnoteSpan,
        },
    ]);
    const toolbar = {
        options: ["inline", "blockType", "list", "link", "image", "remove", "history"],
        inline: { options: ["bold", "italic"] },
        blockType: { options: ["Blockquote"], inDropdown: false },
        list: { options: ["unordered", "ordered"] },
        history: { inDropdown: false },
    };

    useEffect(() => {
        setSection("我的论文");
        clearAlert();
        loadFocusArticle(articleId);
    }, []);
    useEffect(() => {
        if (Object.keys(focusArticle).length > 0) {
            let fetchedContent = null;
            if (chapterId !== "new") {
                const chapter = focusArticle.chapters.filter((c) => c._id === chapterId)[0];
                if (chapter) {
                    setChapterInfo({
                        index: chapter.index,
                        hideIndex: chapter.hideIndex,
                        title: chapter.title,
                    });
                    fetchedContent = JSON.parse(chapter.content);
                    document.getElementById("chapter-identifier").innerHTML = `第${chapter.index}章：${chapter.title}`;
                } else {
                    setAlert("没有找到对应的章节。", "danger");
                    setRedirect(`/dashboard/articles/${articleId}`);
                }
            } else {
                if (document.getElementById("chapter-identifier")) document.getElementById("chapter-identifier").innerHTML = `新章节`;
            }
            const fetchedContentState = fetchedContent ? convertFromRaw(fetchedContent) : EditorState.createEmpty().getCurrentContent();
            fetchedContentState.createEntity("FOOTNOTE", "MUTABLE", { comment: "", source: "", page: "" });
            setFootnoteKey(fetchedContentState.getLastCreatedEntityKey());
            setEditorState(EditorState.createWithContent(fetchedContentState, compositeDecorator));
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
                                                    {inputField(chapterInfo, setFieldData, alerts, "index", "a.b.c", "text", { required: true })}
                                                </div>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-title">
                                                        章节标题
                                                    </label>
                                                    {inputField(chapterInfo, setFieldData, alerts, "title", "章节标题", "text", { required: true })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="hideIndex"
                                                name="hideIndex"
                                                checked={chapterInfo.hideIndex}
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
                                                    <Editor
                                                        editorState={editorState}
                                                        toolbarClassName="rdw-toolbar"
                                                        wrapperClassName="rdw-wrapper"
                                                        editorClassName="rdw-editor"
                                                        onEditorStateChange={onChange}
                                                        toolbar={toolbar}
                                                        toolbarCustomButtons={[<CustomOption footnoteKey={footnoteKey} />]}
                                                        localization={{
                                                            locale: "zh",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Link to={`/dashboard/articles/${articleId}`} className="btn btn-secondary btn-lg ml-3">
                                            <i className="far fa-undo-alt pr-2"></i>返回
                                        </Link>
                                        <button type="submit" className="btn btn-success btn-lg ml-3">
                                            <i className="far fa-check pr-2"></i>
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
