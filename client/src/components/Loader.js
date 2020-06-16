import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Loader = ({ auth }) => {
    if (auth.loading) {
        return (
            <Fragment>
                <div className="lds-facebook-bg">
                    <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </Fragment>
        );
    } else {
        return null;
    }
};

Loader.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Loader);
