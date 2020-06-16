import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LeftNav from "../LeftNav";
import Loader from "../Loader";
import TopNav from "../TopNav";
import Footer from "../Footer";
import About from "../contents/About";
import Readme from "../contents/Readme";

export default () => {
    return (
        <Fragment>
            <LeftNav />
            <div className="main-content">
                <TopNav />
                <div className="container-fluid mt--7">
                    <Loader />
                    <Switch>
                        <Route exact path="/about" component={About} />
                        <Route exact path="/readme" component={Readme} />
                        <Redirect from="/" to="/about" />
                    </Switch>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );

    // <Route
    //     {...rest}
    //     render={(props) =>
    //         !isAuthenticated && !loading ? (
    //             <Redirect to="/login" />
    //         ) : (
    //             <Fragment>
    //                 <LeftNav />
    //                 <div className="main-content">
    //                     <TopNav />
    //                     <div className="container-fluid mt--7">
    //                         <Component {...props} />
    //                         <Footer />
    //                     </div>
    //                 </div>
    //             </Fragment>
    //         )
    //     }
    // />
};
