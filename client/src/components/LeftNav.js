import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const LeftNav = ({ logout, currentSection }) => {
    useEffect(() => {
        [].forEach.call(document.getElementsByClassName("nav-link"), (elem) => {
            elem.dataset.section === currentSection ? elem.classList.add("active") : elem.classList.remove("active");
        });
    }, [currentSection]);

    return (
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main" style={{ zIndex: 999 }}>
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
                    <img src={process.env.PUBLIC_URL + "/img/brand/blue.png"} className="navbar-brand-img" alt="..." />
                </a>
                <div className="text-center d-none d-md-block">
                    <span className="badge badge-danger alpha">Dev 0.0.1</span>
                </div>
                <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile" data-section="我的信息">
                                <i className="fas fa-user text-blue"></i>
                                我的信息
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles" data-section="我的论文">
                                <i className="fas fa-book text-orange"></i>
                                我的论文
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="{{ url_for('illustrations.main_list') }}">
                                <i className="fas fa-images text-yellow"></i>
                                插图管理
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" data-section="关于作者">
                                <i className="fas fa-glasses text-success"></i>
                                关于作者
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/readme" data-section="用户须知">
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
                            <a className="nav-link" href="{{ url_for('main.help_articles') }}">
                                <i className="fas fa-question-circle"></i> 论文添加与编辑
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="{{ url_for('main.help_illustrations') }}">
                                <i className="fas fa-question-circle"></i> 插图管理功能使用
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="{{ url_for('main.help_export') }}">
                                <i className="fas fa-question-circle"></i> 论文格式与导出
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
    currentSection: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
    currentSection: state.section.currentSection,
});
export default connect(mapStateToProps, { logout })(LeftNav);
