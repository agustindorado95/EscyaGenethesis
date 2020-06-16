import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import TopNavUnAuthed from "../TopNavUnAuthed";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { firstName, lastName, email, password, confirmPassword } = formData;

    const [{ policyAgreed }, setPolicyAgreed] = useState({
        policyAgreed: false,
    });

    const checkPolicyAgreed = () => {
        setPolicyAgreed({ policyAgreed: !policyAgreed });
    };

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!policyAgreed) {
            setAlert("请先同意隐私条款。", "danger");
        } else if (password !== confirmPassword) {
            setAlert("两次输入的密码不匹配，请重试。", "danger");
        } else {
            register({ firstName, lastName, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard"></Redirect>;
    }

    return (
        <Fragment>
            <div className="auth-bg">
                <TopNavUnAuthed />
                <div className="header bg-gradient-primary py-7 py-lg-8">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 col-md-6">
                                    <h1 className="text-white">
                                        欢迎使用Genethesis!
                                    </h1>
                                    <p className="text-lead text-light">
                                        模块化论文撰写，全自动论文整合，自定义论文输出。从此不再受论文格式的困扰。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            x="0"
                            y="0"
                            viewBox="0 0 2560 100"
                            preserveAspectRatio="none"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </div>
                <div className="container mt--8 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="card bg-secondary shadow border-0">
                                <div className="card-header bg-transparent pb-3">
                                    <div className="text-muted text-center mt-2 mb-1">
                                        <h2>用户注册</h2>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="input-group input-group-alternative mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fal fa-signature"></i>
                                                            </span>
                                                        </div>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="名"
                                                            name="firstName"
                                                            value={firstName}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <div className="input-group input-group-alternative mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fal fa-signature"></i>
                                                            </span>
                                                        </div>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="姓"
                                                            name="lastName"
                                                            value={lastName}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fal fa-envelope-open"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="电子邮箱地址"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fal fa-lock-open-alt"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="密码"
                                                    name="password"
                                                    minLength="6"
                                                    value={password}
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fal fa-lock-open-alt"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="确认密码"
                                                    name="confirmPassword"
                                                    minLength="6"
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-4">
                                            <div className="col-12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="customCheckRegister"
                                                        type="checkbox"
                                                        onChange={() => {
                                                            checkPolicyAgreed();
                                                        }}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheckRegister"
                                                    >
                                                        <span className="text-muted">
                                                            我同意
                                                            <a
                                                                href="#!"
                                                                data-toggle="modal"
                                                                data-target="#privacyModal"
                                                            >
                                                                隐私协议
                                                            </a>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type={
                                                    policyAgreed
                                                        ? "submit"
                                                        : "button"
                                                }
                                                className={
                                                    policyAgreed
                                                        ? "btn btn-primary mt-4"
                                                        : "btn btn-primary mt-4 disabled"
                                                }
                                                id="register"
                                            >
                                                创建账户
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6"></div>
                                <div className="col-6 text-right">
                                    已经有账户了？直接
                                    <Link to="/login" className="text-light">
                                        登陆
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

Register.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
