import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { signup } from '../store/actions/user';
import './signup.scss';



function Signup() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const { username, email, password } = inputs;

    const location = useLocation();
    
    const dispatch = useDispatch();


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
            dispatch(signup(username, email,  password, from));
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-container__title">
                <h2>signup</h2>
            </div>

            <form className="signup-container__form" onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="username" >Username</label>
                    <input id="username" type="text" onChange={handleChange} />
                </div>

                <div className="form-input">
                    <label htmlFor="email" >Email</label>
                    <input id="email" type="email" onChange={handleChange} />
                </div>
                
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={handleChange} />
                </div>

                <div className="form-submit">
                    <button type="submit" className="form-submit__btn">signup</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;