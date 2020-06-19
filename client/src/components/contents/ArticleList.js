import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSection } from "../../actions/section";

const ArticleList = ({ articles, setSection }) => {
    useEffect(() => {
        setSection("我的论文");
    }, []);

    return (
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header border-0">
                        <div className="row">
                            <div className="col-8">
                                <h3 className="mb-0">我的所有论文 ({articles.length})</h3>
                            </div>
                            <div className="col-4 text-right">
                                <Link to="/articles/new" className="btn btn-primary btn-sm">
                                    新建论文
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">论文标题</th>
                                    <th scope="col">状态</th>
                                    <th scope="col">语言</th>
                                    <th scope="col">导师</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article) => (
                                    <tr key={article._id}>
                                        <th scope="row">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    {article.status === "done" && <span className="mb-0 text-sm text-dark">{article.title}</span>}
                                                    {article.status === "progress" && (
                                                        <a href="{{ url_for('articles.single_article', article_id=article.id) }}" className="text-dark">
                                                            <span className="mb-0 text-sm">{article.title}</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </th>
                                        <td>
                                            <span className="badge badge-dot mr-4">
                                                {article.status === "done" && (
                                                    <Fragment>
                                                        <i className="bg-success"></i> 已完成
                                                    </Fragment>
                                                )}
                                                {article.status === "progress" && (
                                                    <Fragment>
                                                        <i className="bg-danger"></i> 未完成
                                                    </Fragment>
                                                )}
                                            </span>
                                        </td>
                                        <td>
                                            {article.language === "es" && "西班牙语"}
                                            {article.language === "zh" && "中文"}
                                        </td>
                                        <td>{article.tutor}</td>
                                        <td>
                                            {article.status === "done" && (
                                                <Fragment>
                                                    <button className="btn-none articles-action delete pr-2 pl-0" data-id="{{ article.id }}">
                                                        <i className="fas fa-trash-alt text-danger"></i>
                                                    </button>
                                                    <a
                                                        href="{{ url_for('articles.revitalize', article_id=article.id) }}"
                                                        className="articles-action restore pr-2"
                                                    >
                                                        <i className="fas fa-gavel text-warning"></i>
                                                    </a>
                                                    <a
                                                        href="{{ url_for('static', filename='articles/'+current_user.id|string+'/'+article.id|string+'/thesis.docx') }}"
                                                        download="{{ article.title+'.docx' }}"
                                                        className="articles-action download pr-2"
                                                    >
                                                        <i className="fas fa-cloud-download-alt text-success"></i>
                                                    </a>
                                                </Fragment>
                                            )}
                                            {article.status === "progress" && (
                                                <Fragment>
                                                    <a
                                                        href="{{ url_for('articles.finalize', article_id=article.id) }}"
                                                        className="articles-action finalize pr-2"
                                                    >
                                                        <i className="fas fa-check-circle text-success"></i>
                                                    </a>
                                                    <Link to={"/articles/" + article._id} className="articles-action settings pr-2">
                                                        <i className="fas fa-cog text-primary"></i>
                                                    </Link>
                                                    <a
                                                        href="{{ url_for('articles.single_article', article_id=article.id) }}"
                                                        className="articles-action write pr-2"
                                                    >
                                                        <i className="fas fa-pen-nib text-primary"></i>
                                                    </a>
                                                    <button className="btn-none articles-action preview pr-2 pl-0" data-id="{{ article.id }}">
                                                        <i className="fas fa-eye text-primary" data-id="{{ article.id }}"></i>
                                                    </button>
                                                </Fragment>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer py-4">
                        <nav aria-label="...">
                            <ul className="pagination justify-content-end mb-0">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1">
                                        <i className="fas fa-angle-left"></i>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item disabled">
                                    <a className="page-link" href="#">
                                        <i className="fas fa-angle-right"></i>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    setSection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    articles: state.auth.user.articles,
});

export default connect(mapStateToProps, { setSection })(ArticleList);
