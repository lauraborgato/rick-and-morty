import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Home from '../home/home';
import Login from '../login/login';
import Signup from '../signup/signup';
import PrivateRoute from '../auth/privateRoute';

function App() {
    
    let location = useLocation();
    console.log('Location ', location);

    const routes = (
        <Switch >
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect from={location.pathname} to="/" />
        </Switch>
    )

    return (
        <>
            { routes }
        </>
    )
}

export default App;