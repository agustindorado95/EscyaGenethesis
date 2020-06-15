import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
    const userLinks = (
        <Fragment>
            <li className="nav-item">
                <div className="nav-link nav-link-icon">
                    <span className="nav-link-inner--text">
                        欢迎回来, {user && user.firstName}
                    </span>
                </div>
            </li>
            <li className="nav-item">
                <a
                    href="#!"
                    onClick={logout}
                    className="nav-link nav-link-icon"
                >
                    <i className="fal fa-sign-out-alt"></i>
                    <span className="nav-link-inner--text">注销</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link nav-link-icon" to="/register">
                    <i className="fas fa-user-circle"></i>
                    <span className="nav-link-inner--text">注册</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link nav-link-icon" to="/login">
                    <i className="fas fa-key"></i>
                    <span className="nav-link-inner--text">登陆</span>
                </Link>
            </li>
        </Fragment>
    );

    return (
        <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
            <div className="container px-4">
                <Link className="navbar-brand" to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/img/brand/white.png"}
                        alt="brand"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar-collapse-main"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbar-collapse-main"
                >
                    <div className="navbar-collapse-header d-md-none">
                        <div className="row">
                            <div className="col-6 collapse-brand">
                                <Link to="/">
                                    <img
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/img/brand/blue.png"
                                        }
                                        alt="brand"
                                    />
                                </Link>
                            </div>

                            <div className="col-6 collapse-close">
                                <button
                                    type="button"
                                    className="navbar-toggler"
                                    data-toggle="collapse"
                                    data-target="#navbar-collapse-main"
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link nav-link-icon"
                                href="#!"
                                data-toggle="modal"
                                data-target="#privacyModal"
                            >
                                <i className="fas fa-question-circle"></i>
                                <span className="nav-link-inner--text">
                                    用户须知
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link nav-link-icon"
                                href="https://github.com/agustindorado95/Genethesis/issues"
                            >
                                <i className="fas fa-comment"></i>
                                <span className="nav-link-inner--text">
                                    问题反馈
                                </span>
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {!loading && (
                            <Fragment>
                                {isAuthenticated ? userLinks : guestLinks}
                            </Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
