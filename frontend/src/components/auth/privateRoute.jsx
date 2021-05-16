import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {

    const userLS = localStorage.getItem('user');

    function checkLogin() {
        if(userLS){
            return Date.now() >= userLS.expiresIn * 1000 ? true: false;
        }
        return false;
    }

    return (
        <Route {...rest} render={props => {
            console.log('Location in private route ', props)
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