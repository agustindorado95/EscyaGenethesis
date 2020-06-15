import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Modals from "./components/layout/Modals";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/layout/Dashboard";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    // [] Means ComponentDidMount
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <section>
                        <Modals />
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;

