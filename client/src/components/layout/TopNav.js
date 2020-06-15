import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const TopNav = ({ logout, auth: { user } }) => {

    return (
        <div className="main-content">
            <nav
                className="navbar navbar-top navbar-expand-md navbar-dark"
                id="navbar-main"
            >
                <div className="container-fluid">
                    <a
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        href="{{ url_for('main.index') }}"
                    >
                        #SectionTitle
                    </a>
                    <div className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <div className="form-group mb-0">
                            <div className="input-group input-group-alternative">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                <input
                                    id="search-field"
                                    className="form-control search-field"
                                    placeholder="搜索..."
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav align-items-center d-none d-md-flex">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link pr-0"
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
                                                "/avatars/" + user.avatar
                                            }
                                        />
                                    </span>
                                    <div className="media-body ml-2 d-none d-lg-block">
                                        <span className="mb-0 text-sm  font-weight-bold">
                                            {user.lastName}{user.firstName}
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                <div className=" dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">
                                        欢迎回来！
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
                                    href="https://github.com/agustindorado95/EscysGenethesis"
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
                </div>
            </nav>
        </div>
    );
};

TopNav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(TopNav);
