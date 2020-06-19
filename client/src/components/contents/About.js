import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection } from "../../actions/section";

const About = ({ setSection }) => {
    useEffect(() => {
        setSection("关于作者");
    }, []);

    return (
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header border-0">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="mb-2" data-toc-skip>
                                    关于作者
                                </h3>
                                <small className="text-muted">一只既是程序猿又是设计狮的西语狗</small>
                            </div>
                        </div>
                        <hr className="mt-3 mb-0" />
                    </div>
                    <div className="card-body pt-2">
                        <p>写完副标题发现其实也没什么好说的。</p>
                        <p>愿意支持一下的话就去Github上给这个项目点个赞吧。</p>
                        <p>嗯，大概就这样咯。</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

About.propTypes = {
    setSection: PropTypes.func.isRequired,
};
export default connect(null, { setSection })(About);
