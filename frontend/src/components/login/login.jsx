import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { login } from '../store/actions/user';
import './login.scss';



function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;

    const location = useLocation();
    
    const dispatch = useDispatch();

    const history = useHistory();

    function handleChange(e) {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        if (username && password) {
            // get return url from location state or default to home page
                   // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(login(username, password, from));
        }
    }

    function handleClick() {
        history.push("/path/to/push");
    }

    return (
        <div className="login-container">
            <div className="login-container__title">
                <h2>Login</h2>
            </div>

            <form className="login-container__form" onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="username" >Username</label>
                    <input id="username" type="text" onChange={handleChange} />
                </div>
                
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="text" onChange={handleChange} />
                </div>

                <div className="form-submit">
                    <button type="submit" className="form-submit__btn">Login</button>
                    <button type="button" className="form-submit__btn" onClick={handleClick} type="button">Sign Up</button>
                </div>
            </form>

        </div>
    )
}

export default Login;