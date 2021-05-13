//Import dependences
import { Switch, Redirect, Route } from 'react-router-dom';
import { login as LoginView } from "./views"

import React from 'react';

/**
 * create a functional object for route control
 * Routes
 *      / ro redirect /login
 *      /login
 *      /inbox
 *      /not-found
 */
const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/login" />
                <Route path="/login" component={LoginView}/>
            <Redirect to="/not-found" />
        </Switch>
    )
}

//Export that
export default Routes;