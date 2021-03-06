import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile, uploadAvatar, uploadSignature } from "../../actions/auth";
import { clearAlert } from "../../actions/alert";
import { setSection } from "../../actions/section";
import { loadUserArticles } from "../../actions/article";
import { inputField, textAreaField } from '../InputField'

const Profile = ({ setSection, updateProfile, uploadAvatar, uploadSignature, auth: { user, loading }, clearAlert, alerts, loadUserArticles, userArticles }) => {
    useEffect(() => {
        setSection("我的信息");
        loadUserArticles();
    }, []);

    const [editing, setEditing] = useState(false);

    const submitAvatarChange = (e) => {
        if (e.target.files[0]) {
            uploadAvatar({ avatar: e.target.files[0] });
        }
    };

    const submitSignatureChange = (e) => {
        if (e.target.files[0]) {
            uploadSignature({ signature: e.target.files[0] });
        }
    };

    const [profileFormData, setProfileFormData] = useState({});

    useEffect(() => {
        if (!loading) {
            setProfileFormData({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                university: user.university,
                faculty: user.faculty,
                grade: user.grade,
                selfIntro: user.selfIntro,
            });
        }
        alerts.length > 0 && clearAlert()
    }, [editing]);

    useEffect(() => {
        if (!loading) {
            setEditing(false);
            setProfileFormData({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                university: user.university,
                faculty: user.faculty,
                grade: user.grade,
                selfIntro: user.selfIntro,
            });
        }
    }, [loading]);

    const setProfileFieldData = (e) =>
        setProfileFormData({
            ...profileFormData,
            [e.target.name]: e.target.value,
        });

    const submitProfileChange = async (e) => {
        e.preventDefault();
        clearAlert();
        updateProfile(profileFormData);
    };

    return (
        <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 order-lg-2">
                            <div className="card-profile-image">
                                <div className="avatar-container" onClick={() => document.getElementById("is-avatar-upload").click()}>
                                    <img src={process.env.PUBLIC_URL + "/avatars/" + user.avatar} className="rounded-circle" alt="Avatar" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 pointer-event-none"></div>
                    <div className="card-body pt-0 pt-md-4 pointer-event-none">
                        <div className="row">
                            <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                    <div>
                                        <span className="heading">{userArticles.filter((article) => article.status === "finalized").length}</span>
                                        <span className="description">已完成论文数</span>
                                    </div>
                                    <div>
                                        <span className="heading">{userArticles.filter((article) => article.status === "progress").length}</span>
                                        <span className="description">未完成论文数</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3>
                                {user.lastName}
                                {user.firstName}
                            </h3>
                            <div className="h5 font-weight-300">
                                注册日期：
                                {new Date(user.timeCreated).toLocaleDateString("zh-CN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="h5 mt-4">
                                <i className="ni business_briefcase-24 mr-2"></i>
                                {user.faculty}, {user.grade}
                            </div>
                            <div>
                                <i className="ni education_hat mr-2"></i>
                                {user.university}
                            </div>
                            <hr className="my-4" />
                            <a href="#!" className="change-signature" onClick={() => document.getElementById("is-signature-upload").click()}>
                                <i className="fas fa-signature pr-2"></i>
                                {user.signature ? "修改签名" : "添加签名"}
                            </a>
                            {user.signature && (
                                <img src={process.env.PUBLIC_URL + "/signatures/" + user.signature} alt="Signature" className="signature-img mt-3" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                    <div className="card-header bg-white border-0">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h3 className="mb-0">我的账户</h3>
                            </div>
                            <div className="col-4 text-right">
                                <button className="btn btn-sm btn-warning" id="change-password" data-toggle="modal" data-target="#passwordResetModal">
                                    修改密码
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={() => setEditing(!editing)}>
                                    {editing ? "取消编辑" : "编辑信息"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitProfileChange}>
                            <h6 className="heading-small text-muted mb-4">基本信息</h6>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-email">
                                                电子邮箱
                                            </label>
                                            {editing ? (
                                                inputField(profileFormData, setProfileFieldData, alerts, "email", "电子邮箱地址", "email", {required:true})
                                            ) : (
                                                <p className="old-info">{user.email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-last-name">
                                                姓
                                            </label>
                                            {editing ? (
                                                inputField(profileFormData, setProfileFieldData, alerts, "lastName", "姓", "text", {required:true})
                                            ) : (
                                                <p className="old-info">{user.lastName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-first-name">
                                                名
                                            </label>

                                            {editing ? (
                                                inputField(profileFormData, setProfileFieldData, alerts, "firstName", "名", "text", {required:true})
                                            ) : (
                                                <p className="old-info">{user.firstName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">学历信息</h6>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-university">
                                                大学
                                            </label>
                                            {editing ? (
                                                inputField(profileFormData, setProfileFieldData, alerts, "university", "大学", "text", {required:true})
                                            ) : (
                                                <p className="old-info">{user.university}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-faculty">
                                                院系
                                            </label>
                                            {editing ? (
                                                inputField(profileFormData, setProfileFieldData, alerts, "faculty", "院系", "text", {required:true})
                                            ) : (
                                                <p className="old-info">{user.faculty}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="input-grade">
                                                年级
                                            </label>
                                            {editing ? (
                                                inputField(profileFormData, setProfileFieldData, alerts, "grade", "年级", "text", {required:true})
                                            ) : (
                                                <p className="old-info">{user.grade}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4">个人简介</h6>
                            <div className="pl-lg-4">
                                <div className="form-group">
                                    {editing ? (
                                        textAreaField(profileFormData, setProfileFieldData, alerts, "selfIntro", "个人简介")
                                    ) : (
                                        <p className="old-info">{user.selfIntro}</p>
                                    )}
                                </div>
                            </div>

                            {editing ? (
                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary btn-lg" id="submit-edit-info">
                                        更新信息
                                    </button>
                                </div>
                            ) : null}
                        </form>

                        <input type="file" className="form-control-file no-display" id="is-avatar-upload" name="avatar" onChange={submitAvatarChange} />

                        <input
                            type="file"
                            className="form-control-file no-display"
                            id="is-signature-upload"
                            name="signature"
                            onChange={submitSignatureChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    alerts: PropTypes.array.isRequired,
    clearAlert: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func.isRequired,
    setSection: PropTypes.func.isRequired,
    loadUserArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    alerts: state.alert,
    userArticles: state.article.userArticles
});

export default connect(mapStateToProps, {
    setSection,
    updateProfile,
    uploadAvatar,
    uploadSignature,
    clearAlert,
    loadUserArticles
})(Profile);
