import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection } from "../../actions/section";
import { clearAlert } from "../../actions/alert";
import { loadFocusArticle, updateArticle } from "../../actions/article";
import { textAreaField } from "../InputField";
import { sideStructurePreview } from "../SideStructurePreview";

const ArticleSectionEdit = ({ alerts, setSection, clearAlert, focusArticle, loadFocusArticle, updateArticle }) => {
    const { articleId, section } = useParams();

    const [formData, setFormData] = useState({ content: "" });

    const setFieldData = (e) => {
        alerts.length > 0 && clearAlert();
        setFormData({ content: e.target.value });
    };

    const submitContent = (e) => {
        e.preventDefault();
        clearAlert();
        const req = {};
        req[section] = formData.content;
        updateArticle({ ...req, articleId });
    };

    useEffect(() => {
        setSection("我的论文");
        clearAlert();
        loadFocusArticle(articleId);
    }, []);

    useEffect(() => {
        if (Object.keys(focusArticle).length > 0) {
            section === "abstract" ? setFormData({ content: focusArticle[section][0].value }) : setFormData({ content: focusArticle[section] });
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
                                    {section}
                                </h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitContent}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">{textAreaField(formData, setFieldData, alerts, "content", "内容", { rows: 5 })}</div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <Link to={`/dashboard/articles/${articleId}`} className="btn btn-secondary btn-lg ml-3">
                                        <i className="far fa-undo-alt pr-2"></i>返回
                                        </Link>
                                        <button type="submit" className="btn btn-success btn-lg ml-3">
                                        <i className="far fa-check pr-2"></i>提交修改
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

ArticleSectionEdit.propTypes = {
    setSection: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    focusArticle: PropTypes.object.isRequired,
    loadFocusArticle: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    alerts: state.alert,
    focusArticle: state.article.focusArticle,
});
export default connect(mapStateToProps, { setSection, clearAlert, loadFocusArticle, updateArticle })(ArticleSectionEdit);
