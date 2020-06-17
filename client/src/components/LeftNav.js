import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import { setSection } from "../actions/section";

const LeftNav = ({ logout, setSection, auth: { user } }) => {
    const changeActiveSection = (e) => {
        e.target.parentNode.parentNode.childNodes.forEach(elem=>elem.childNodes[0].classList.remove('active'))
        e.target.classList.add('active')
        setSection(e.target.dataset.section)
    };

    return (
        <nav
            className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
            id="sidenav-main"
            style={{ zIndex: 999 }}
        >
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#sidenav-collapse-main"
                    aria-controls="sidenav-main"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand pt-0" href="/">
                    <img
                        src={process.env.PUBLIC_URL + "/img/brand/blue.png"}
                        className="navbar-brand-img"
                        alt="..."
                    />
                </a>
                <div className="text-center d-none d-md-block">
                    <span className="badge badge-danger alpha">Dev 0.0.1</span>
                </div>
                <div
                    className="collapse navbar-collapse"
                    id="sidenav-collapse-main"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                onClick={changeActiveSection}
                                to="/profile" data-section="我的信息"
                            >
                                <i className="fas fa-user text-blue"></i>
                                我的信息
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="{{ url_for('articles.main_list') }}"
                            >
                                <i className="fas fa-book text-orange"></i>
                                我的论文
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="{{ url_for('illustrations.main_list') }}"
                            >
                                <i className="fas fa-images text-yellow"></i>
                                插图管理
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                onClick={changeActiveSection}
                                to="/about" data-section="关于作者"
                            >
                                <i className="fas fa-glasses text-success"></i>
                                关于作者
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                onClick={changeActiveSection}
                                to="/readme"  data-section="用户须知"
                            >
                                <i className="fas fa-file-alt text-info"></i>
                                用户须知
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="!#" onClick={logout}>
                                <i className="fas fa-power-off text-danger"></i>
                                退出系统
                            </a>
                        </li>
                    </ul>
                    <hr className="my-3" />
                    <h6 className="navbar-heading text-muted">支持文档</h6>
                    <ul className="navbar-nav mb-md-3">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="{{ url_for('main.help_articles') }}"
                            >
                                <i className="fas fa-question-circle"></i>{" "}
                                论文添加与编辑
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="{{ url_for('main.help_illustrations') }}"
                            >
                                <i className="fas fa-question-circle"></i>{" "}
                                插图管理功能使用
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="{{ url_for('main.help_export') }}"
                            >
                                <i className="fas fa-question-circle"></i>{" "}
                                论文格式与导出
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

LeftNav.propTypes = {
    logout: PropTypes.func.isRequired,
    setSection: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout, setSection })(LeftNav);
