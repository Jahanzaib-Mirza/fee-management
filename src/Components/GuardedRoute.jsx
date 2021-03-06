import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === false
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default GuardedRoute;