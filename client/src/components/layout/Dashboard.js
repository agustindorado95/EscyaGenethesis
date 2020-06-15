import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LeftNav from "./LeftNav";
import TopNav from "./TopNav";

const Dashboard = ({ auth: { user } }) => {
    return (
        <Fragment>
            <LeftNav />
            <div className="main-content">
                <TopNav />
                
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);
