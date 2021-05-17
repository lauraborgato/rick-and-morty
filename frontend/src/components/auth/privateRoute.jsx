import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {

    const userLS = localStorage.getItem('user');

    function checkLogin() {
        if(userLS){
            return Date.now() <= new Date(JSON.parse(userLS).tokenExpires) ? true: false;
        }
        return false;
    }

    return (
        <Route {...rest} render={props => {
            if (!checkLogin()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute;