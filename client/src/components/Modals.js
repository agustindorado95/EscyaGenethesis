import React from "react";
import { connect } from "react-redux";

const Modals = () => {
    return (
        <div
            className="modal fade"
            id="privacyModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="privacyModalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="privacyModalLabel">
                            隐私声明
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body pt-0 pb-0">
                        <h3 className="mb-4">致参加Alpha测试的用户们：</h3>
                        <p className="text-muted text-sm">
                            如果我说你们的数据我拿不到，那我是鬼扯，因为无论是文件还是数据库都存在我的服务器上，但是我作为一个在读学生，真的没有利益相关。写这个应用三成是为了自用，三成是为了熟悉Python语言，三成是因为闲着无聊，还有一成是为了证明那个什么维普论文系统简直业余得搞笑。别说科班出身，我这个文科生单枪匹马既当设计狮又当程序猿，这个应用只用了半个月多点。一个专业团队能把系统做成那样，本强迫症实名反对。
                        </p>
                        <p className="text-muted text-sm">
                            但是有一点很重要，就是
                            <strong className="text-red">
                                用户的密码我是拿不到的
                            </strong>
                            。因为整个系统上没有任何地方存储过用户密码的明码，后端一收到，立刻就用Bcrypt做过了hash处理，代码开源，不放心的话可以检查一下users/routes.py文件。所以绝对不用担心我拿你们的用户名和密码去碰别的应用，光拿着hash码是没用的。如果你还是不放心，又觉得一定要用这个系统，所有代码都是开源的，从Github里克隆下来在本地运行也行。
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Modals.protoTypes = {};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Modals);
