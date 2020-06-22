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
import ArticleList from "../contents/ArticleList";
import ArticleSettings from "../contents/ArticleSettings";
import ArticleStructure from "../contents/ArticleStructure";
import ChapterEdit from "../contents/ChapterEdit";
import ArticleSectionEdit from "../contents/ArticleSectionEdit";

const Dashboard = ({ auth, article, redirect }) => {

    return (
        <Fragment>
            <LeftNav />
            <div className="main-content">
                <div className="calc-height-before-footer">
                <Route path='/' component={TopNav} />
                <div className="container-fluid mt--7">
                    {auth.loading || article.loading ? <Loader /> : null}
                    {redirect && <Redirect to={redirect} />}
                    <Switch>
                        <Route exact path="/dashboard/about" component={About} />
                        <Route exact path="/dashboard/readme" component={Readme} />
                        <Route exact path="/dashboard/profile" component={Profile} />
                        <Route exact path="/dashboard/articles/:articleId/settings" component={ArticleSettings} />
                        <Route exact path="/dashboard/articles/:articleId/chapters/:chapterId" component={ChapterEdit} />
                        <Route exact path="/dashboard/articles/:articleId/sections/:section" component={ArticleSectionEdit} />
                        <Route exact path="/dashboard/articles/:articleId" component={ArticleStructure} />
                        <Route exact path="/dashboard/articles" component={ArticleList} />
                        <Redirect from="/dashboard" to="/dashboard/profile" />
                    </Switch>
                </div>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    article: state.article,
    redirect: state.section.redirect
});

export default connect(mapStateToProps)(Dashboard);
