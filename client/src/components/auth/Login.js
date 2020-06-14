import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ email, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard"></Redirect>;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Login</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Log in to current user
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="电子邮箱地址"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="密码"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="登陆" />
            </form>
            <p className="my-1">
                还没有账户吗？现在<Link to="/register">注册</Link>
            </p>
        </Fragment>
    );
};

Login.protoTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);