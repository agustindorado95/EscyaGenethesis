import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSection } from "../../actions/section";
import { loadUserArticles, markArticleStatus } from "../../actions/article";

const ArticleList = ({ userArticles, setSection, loadUserArticles, markArticleStatus }) => {
    useEffect(() => {
        setSection("我的论文");
        loadUserArticles();
    }, []);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    return (
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header border-0">
                        <div className="row">
                            <div className="col-8">
                                <h3 className="mb-0">我的所有论文 ({userArticles.length})</h3>
                            </div>
                            <div className="col-4 text-right">
                                <Link to="/dashboard/articles/new" className="btn btn-primary btn-sm">
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
                                    <th scope="col">最后修改</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userArticles.slice((page - 1) * perPage, (page - 1) * perPage + perPage).map((article) => (
                                    <tr key={article._id}>
                                        <th scope="row">
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    {article.status === "finalized" && <span className="mb-0 text-sm text-dark">{article.title}</span>}
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
                                                {article.status === "finalized" && (
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
                                            {new Date(article.timeEdited).toLocaleDateString("zh-CN", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                            })}
                                        </td>
                                        <td>
                                            {article.status === "finalized" && (
                                                <Fragment>
                                                    <button className="btn-none articles-action delete pr-2 pl-0" data-id="{{ article.id }}">
                                                        <i className="fas fa-trash-alt text-danger"></i>
                                                    </button>
                                                    <span
                                                        onClick={() => {
                                                            markArticleStatus({ id: article._id, status: "progress" });
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
                                                            markArticleStatus({ id: article._id, status: "finalized" });
                                                        }}
                                                        className="cursor-pointer pr-2"
                                                    >
                                                        <i className="fas fa-check-circle text-success"></i>
                                                    </span>
                                                    <Link to={"/dashboard/articles/" + article._id} className="pr-2">
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
                                        <li className="page-item">
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
                                        <li className={page < Math.ceil(userArticles.length / perPage) ? "page-item" : "page-item disabled"}>
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
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                onClick={() => {
                                                    setPage(Math.ceil(userArticles.length / perPage));
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
    markArticleStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userArticles: state.article.userArticles,
});

export default connect(mapStateToProps, { setSection, loadUserArticles, markArticleStatus })(ArticleList);
