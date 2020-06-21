import React, { useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection } from "../../actions/section";
import { loadFocusArticle, deleteChapter } from "../../actions/article";
import { v4 as uuidv4 } from "uuid";

const ArticleStructure = ({ setSection, focusArticle, loadFocusArticle, deleteChapter }) => {
    const { articleId } = useParams();

    useEffect(() => {
        setSection("我的论文");
        loadFocusArticle(articleId);
    }, []);

    const generateArticleContentRow = (section, name, title = "") => (
        <Fragment key={uuidv4()}>
            <div className="input-group-sm input-group mb-3 input-group-border-bottom-only">
                <div className="input-group-prepend">
                    <span className="input-group-text">{name}</span>
                </div>
                <div type="text" className="form-control form-control-sm">
                    {title}
                </div>
                <div className="input-group-append">
                    <span
                        className="input-group-text cursor-pointer text-hover-primary"
                        onClick={() => {
                            console.log(section);
                        }}
                        data-toggle="tooltip"
                        title="编辑内容"
                    >
                        <i className="far fa-edit"></i>
                    </span>
                </div>
            </div>
        </Fragment>
    );

    const generateChapterRow = (chapter) => (
        <Fragment key={chapter._id}>
            <div className="input-group-sm input-group mb-3 input-group-border-bottom-only">
                {[...Array(chapter.index.split(".").length - 1).keys()].map(() => (
                    <div className="pr-5" key={uuidv4()}></div>
                ))}
                <div className="input-group-prepend">
                    <span className="input-group-text">第{chapter.index}章</span>
                </div>
                <div type="text" className="form-control form-control-sm">
                    {chapter.title}
                </div>
                <div className="input-group-append">
                    <Link
                        to={`/dashboard/articles/${articleId}/chapters/${chapter._id}`}
                        className="input-group-text cursor-pointer text-hover-primary"
                        data-toggle="tooltip"
                        title="编辑内容"
                    >
                        <i className="far fa-edit"></i>
                    </Link>
                    <span
                        className="input-group-text cursor-pointer text-hover-danger"
                        onClick={() => {
                            deleteChapter({articleId:articleId, chapterId:chapter._id});
                        }}
                        data-toggle="tooltip"
                        title="删除章节"
                    >
                        <i className="far fa-trash-alt"></i>
                    </span>
                </div>
            </div>
        </Fragment>
    );

    if (Object.keys(focusArticle).length > 0) {
        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-header border-0">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="mb-2">{focusArticle.title[0].value}</h3>
                                        <h5 className="mb-2">{focusArticle.subTitle[0].value && focusArticle.subTitle[0].value}</h5>
                                    </div>
                                </div>
                                <hr className="mt-3 mb-0" />
                            </div>
                            <div className="card-body pt-2">
                                {generateArticleContentRow("abstract", "摘要")}
                                {focusArticle.chapters.map((chapter) => generateChapterRow(chapter))}
                                {generateArticleContentRow("bibliography", "参考文献")}
                                {generateArticleContentRow("gratitude", "致谢辞")}
                            </div>
                            <div className="card-footer py-4">
                                <div className="text-right">
                                    <Link to="/dashboard/articles" className="btn btn-secondary">
                                        返回
                                    </Link>
                                    <Link to={`/dashboard/articles/${focusArticle._id}/chapters/new`} className="btn btn-primary">
                                        新建章节
                                    </Link>
                                </div>
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

ArticleStructure.propTypes = {
    setSection: PropTypes.func.isRequired,
    focusArticle: PropTypes.object.isRequired,
    loadFocusArticle: PropTypes.func.isRequired,
    deleteChapter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    focusArticle: state.article.focusArticle,
});
export default connect(mapStateToProps, { setSection, loadFocusArticle, deleteChapter })(ArticleStructure);
