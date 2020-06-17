import React, { Fragment, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Alert from "./components/Alert";
import Modals from "./components/Modals";
import Login from "./components/layouts/Login";
import Register from "./components/layouts/Register";
import Dashboard from "./components/layouts/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
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
                    <Modals />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute component={Dashboard} />
                    </Switch>
                    <Alert />
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
