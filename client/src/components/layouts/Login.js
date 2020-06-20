import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { clearAlert } from "../../actions/alert";
import { inputField } from "../InputField";
import TopNavUnAuthed from "../TopNavUnAuthed";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated, alerts, clearAlert }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const setFieldData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        alerts.length > 0 && clearAlert();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        login(formData);
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
                                    <h1 className="text-white">欢迎使用Genethesis!</h1>
                                    <p className="text-lead text-light">模块化论文撰写，全自动论文整合，自定义论文输出。从此不再受论文格式的困扰。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </div>
                <div className="container mt--8 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            <div className="card bg-secondary shadow border-0">
                                <div className="card-header bg-transparent pb-3">
                                    <div className="text-muted text-center mt-2 mb-1">
                                        <h2>用户登录</h2>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="form-group mb-3">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fal fa-envelope-open"></i>
                                                    </span>
                                                </div>
                                                {inputField(formData, setFieldData, alerts, "email", "电子邮箱地址", "email", {required:true})}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fal fa-lock-open-alt"></i>
                                                    </span>
                                                </div>
                                                {inputField(formData, setFieldData, alerts, "password", "密码", "password", {required:true})}
                                            </div>
                                        </div>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheckLogin" />
                                            <label className="custom-control-label text-muted" htmlFor="customCheckLogin">
                                                记住我
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary my-4">
                                                登录
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <a href="#" className="text-light">
                                        <small>忘记密码？</small>
                                    </a>
                                </div>
                                <div className="col-6 text-right">
                                    还没有账户吗？现在
                                    <Link to="/register" className="text-light">
                                        注册
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

Login.protoTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    clearAlert: PropTypes.func.isRequired,
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    alerts: state.alert,
});
export default connect(mapStateToProps, { login, clearAlert })(Login);
