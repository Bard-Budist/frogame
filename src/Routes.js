//Import dependences
import { Switch, Redirect, Route } from 'react-router-dom';
import {
    login as LoginView,
    register as RegisterView,
    home as HomeView,
    game as GameView
} from "./views"

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
            <Redirect exact from="/" to="/login"/>
            <Route path="/login" component={LoginView}/>
            <Route path="/register" component={RegisterView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/game" component={GameView}/>
        </Switch>
    )
}

//Export that
export default Routes;