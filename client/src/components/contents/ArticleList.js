import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSection } from "../../actions/section";
import { loadUserArticles, clearFocusArticle, markArticleStatus, deleteArticle } from "../../actions/article";
import locales from "../../utils/locales";
import {queryArticleList} from '../../utils/query'

const ArticleList = ({ userArticles, setSection, loadUserArticles, clearFocusArticle, markArticleStatus, deleteArticle, history }) => {
    useEffect(() => {
        setSection("我的论文");
        clearFocusArticle();
        loadUserArticles();
    }, []);

    const query = useLocation().search.slice(1)
    let articles = userArticles
    if (query) {
        articles = queryArticleList(articles, query)
    }
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const toArticlePage = (articleId) => {
        history.push(`/dashboard/articles/${articleId}`);
    };
    return (
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header border-0">
                        <div className="row">
                            <div className="col-8">
                                <h3 className="mb-0">论文列表 ({articles.length})</h3>
                            </div>
                            <div className="col-4 text-right">
                                <Link to="/dashboard/articles/new/settings" className="btn btn-primary btn-sm">
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
                                    <th scope="col">关键词</th>
                                    <th scope="col">最后修改</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.slice((page - 1) * perPage, (page - 1) * perPage + perPage).map((article) => (
                                    <tr key={article._id} className="bg-hover-dark">
                                        <th scope="row" onClick={() => toArticlePage(article._id)} className="cursor-pointer">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <span className="mb-0 text-sm text-dark text-color-trasition">{article.title[0].value}</span>
                                                </div>
                                            </div>
                                        </th>
                                        <td onClick={() => toArticlePage(article._id)} className="cursor-pointer">
                                            <span className="badge badge-dot mr-4">
                                                {article.status === "finalized" && (
                                                    <Fragment>
                                                        <i className="bg-success"></i> <span className="text-color-trasition">已完成</span>
                                                    </Fragment>
                                                )}
                                                {article.status === "progress" && (
                                                    <Fragment>
                                                        <i className="bg-danger"></i> <span className="text-color-trasition">未完成</span>
                                                    </Fragment>
                                                )}
                                            </span>
                                        </td>
                                        <td onClick={() => toArticlePage(article._id)} className="cursor-pointer">
                                            <span className="text-color-trasition">{locales[article.mainLanguage]}</span>
                                        </td>
                                        <td onClick={() => toArticlePage(article._id)} className="cursor-pointer">
                                            <span className="text-color-trasition">{article.tutor}</span>
                                        </td>
                                        <td onClick={() => toArticlePage(article._id)} className="cursor-pointer">
                                            <span className="text-color-trasition">{article.keywords[0].value}</span>
                                        </td>
                                        <td onClick={() => toArticlePage(article._id)} className="cursor-pointer">
                                            <span className="text-color-trasition">
                                                {new Date(article.timeEdited).toLocaleDateString("zh-CN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-none articles-action delete pr-2 pl-0"
                                                onClick={() => {
                                                    deleteArticle({ articleId: article._id });
                                                }}
                                            >
                                                <i className="fas fa-trash-alt text-danger"></i>
                                            </button>
                                            {article.status === "finalized" && (
                                                <Fragment>
                                                    <span
                                                        onClick={() => {
                                                            markArticleStatus({ articleId: article._id, status: "progress" });
                                                        }}
                                                        className="cursor-pointer pr-2"
                                                    >
                                                        <i className="fas fa-gavel text-warning"></i>
                                                    </span>
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
                                                    <span
                                                        onClick={() => {
                                                            markArticleStatus({ articleId: article._id, status: "finalized" });
                                                        }}
                                                        className="cursor-pointer pr-2"
                                                    >
                                                        <i className="fas fa-check-circle text-success"></i>
                                                    </span>
                                                    <Link to={`/dashboard/articles/${article._id}/languages`} className="pr-2">
                                                        <i className="fas fa-language text-primary"></i>
                                                    </Link>
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
                            <div className="row">
                                <div className="col">
                                    <span>每页显示：</span>
                                    <select
                                        className="form-control form-control-alternative form-control-sm w-auto d-inline-block"
                                        value={perPage}
                                        onChange={(e) => {
                                            setPerPage(Number(e.target.value));
                                        }}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                    <span className="pl-2">篇</span>
                                </div>
                                <div className="col">
                                    <ul className="pagination justify-content-end mb-0">
                                        <li className={page > 1 ? "page-item" : "page-item disabled"}>
                                            <span
                                                className="page-link"
                                                onClick={() => {
                                                    setPage(1);
                                                }}
                                            >
                                                <i className="fas fa-angle-double-left"></i>
                                                <span className="sr-only">First</span>
                                            </span>
                                        </li>
                                        <li className={page > 1 ? "page-item" : "page-item disabled"}>
                                            <span
                                                className="page-link"
                                                onClick={() => {
                                                    setPage(page - 1);
                                                }}
                                            >
                                                <i className="fas fa-angle-left"></i>
                                                <span className="sr-only">Previous</span>
                                            </span>
                                        </li>
                                        <li className="page-item active">
                                            <span className="page-link">{page}</span>
                                        </li>
                                        <li className={page < Math.ceil(articles.length / perPage) ? "page-item" : "page-item disabled"}>
                                            <span
                                                className="page-link"
                                                onClick={() => {
                                                    setPage(page + 1);
                                                }}
                                            >
                                                <i className="fas fa-angle-right"></i>
                                                <span className="sr-only">Next</span>
                                            </span>
                                        </li>
                                        <li className={page < Math.ceil(articles.length / perPage) ? "page-item" : "page-item disabled"}>
                                            <span
                                                className="page-link"
                                                onClick={() => {
                                                    setPage(Math.ceil(articles.length / perPage));
                                                }}
                                            >
                                                <i className="fas fa-angle-double-right"></i>
                                                <span className="sr-only">Last</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

ArticleList.propTypes = {
    userArticles: PropTypes.array.isRequired,
    setSection: PropTypes.func.isRequired,
    loadUserArticles: PropTypes.func.isRequired,
    clearFocusArticle: PropTypes.func.isRequired,
    markArticleStatus: PropTypes.func.isRequired,
    deleteArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userArticles: state.article.userArticles,
});

export default connect(mapStateToProps, { setSection, loadUserArticles, clearFocusArticle, markArticleStatus, deleteArticle })(ArticleList);
