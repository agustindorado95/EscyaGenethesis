import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const LeftNav = ({ logout, auth: { isAuthenticated, user } }) => {
    if (isAuthenticated) {
        return (
            <nav
                className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
                id="sidenav-main"
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
                    <a
                        className="navbar-brand pt-0"
                        href="{{ url_for('main.index') }}"
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/img/brand/blue.png"}
                            className="navbar-brand-img"
                            alt="..."
                        />
                    </a>
                    <div className="text-center d-none d-md-block">
                    <span className="badge badge-danger alpha">Dev 0.0.1</span>
                    </div>
                    <ul className="nav align-items-center d-md-none">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <div className="media align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img
                                            alt="Avatar"
                                            src={
                                                process.env.PUBLIC_URL +
                                                "/avatars/" +
                                                user.avatar
                                            }
                                        />
                                    </span>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                <div className=" dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">
                                        欢迎回来, {user.firstName}
                                    </h6>
                                </div>
                                <a
                                    href="{{ url_for('users.profile') }}"
                                    className="dropdown-item"
                                >
                                    <i className="ni ni-single-02"></i>
                                    <span>我的信息</span>
                                </a>
                                <a href="#!" className="dropdown-item disabled">
                                    <i className="ni ni-settings-gear-65"></i>
                                    <span>偏好设置</span>
                                </a>
                                <a href="#!" className="dropdown-item disabled">
                                    <i className="ni ni-calendar-grid-58"></i>
                                    <span>历史记录</span>
                                </a>
                                <a
                                    href="https://github.com/agustindorado95/Genethesis"
                                    className="dropdown-item"
                                >
                                    <i className="ni ni-support-16"></i>
                                    <span>支持该项目</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a
                                    href="!#"
                                    onClick={logout}
                                    className="dropdown-item"
                                >
                                    <i className="ni ni-user-run"></i>
                                    <span>登出</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div
                        className="collapse navbar-collapse"
                        id="sidenav-collapse-main"
                    >
                        <div className="navbar-collapse-header d-md-none">
                            <div className="row">
                                <div className="col-6 collapse-brand">
                                    <a href="{{ url_for('main.index') }}">
                                        <img
                                            src={
                                                process.env.PUBLIC_URL +
                                                "/img/brand/blue.png"
                                            }
                                            alt="brand"
                                        />
                                    </a>
                                </div>
                                <div className="col-6 collapse-close">
                                    <button
                                        type="button"
                                        className="navbar-toggler"
                                        data-toggle="collapse"
                                        data-target="#sidenav-collapse-main"
                                        aria-controls="sidenav-main"
                                        aria-expanded="false"
                                        aria-label="Toggle sidenav"
                                    >
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-3 d-md-none">
                            <div className="input-group input-group-rounded input-group-merge">
                                <input
                                    id="search-field-2"
                                    type="search"
                                    className="form-control form-control-rounded form-control-prepended search-field"
                                    placeholder="搜索..."
                                    aria-label="Search"
                                />
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fa fa-search"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="{{ url_for('users.profile') }}"
                                >
                                    <i className="fas fa-user text-blue"></i>
                                    我的信息
                                </a>
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
                                <a
                                    className="nav-link"
                                    href="{{ url_for('main.about') }}"
                                >
                                    <i className="fas fa-glasses text-success"></i>
                                    关于作者
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="{{ url_for('main.important') }}"
                                >
                                    <i className="fas fa-file-alt text-info"></i>
                                    用户须知
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="!#"
                                    onClick={logout}
                                >
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
    } else {
        return null;
    }
};

LeftNav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(LeftNav);
