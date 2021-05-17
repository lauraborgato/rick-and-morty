import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Home from '../home/home';
import Login from '../login/login';
import Signup from '../signup/signup';
import Detail from '../detail/detail';
import PrivateRoute from '../auth/privateRoute';

function App() {
    
    let location = useLocation();
    const routes = (
        <Switch >
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/detail/:id" component={Detail}  />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
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