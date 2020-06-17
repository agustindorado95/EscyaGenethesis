import React, { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LeftNav from "../LeftNav";
import Loader from "../Loader";
import TopNav from "../TopNav";
import Footer from "../Footer";
import About from "../contents/About";
import Readme from "../contents/Readme";
import Profile from "../contents/Profile";

const Dashboard = ({ auth }) => {
    return (
        <Fragment>
            <LeftNav />
            <div className="main-content">
                <TopNav />
                <div className="container-fluid mt--7">
                    {auth.loading ? <Loader /> : null}
                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/readme" component={Readme} />
                        <Route exact path="/profile" component={Profile} />
                        <Redirect from="/" to="/profile" />
                    </Switch>
                    <Footer />
                </div>
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
