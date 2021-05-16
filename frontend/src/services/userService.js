import axios from 'axios';

export const userService = {
    login,
    signup
}

function login(username, password) {
    
    const requestOptions = { email: username, password };
    console.log('Login ', requestOptions)
    
    // Here it should be the axios call to the backend. Now I am using mock with username and password, but i should send the complete object
    
    return axios.post('http://localhost:8080/api/auth/login', requestOptions)
        .then( user => {
            console.log('jony gomaa', user.data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
        })

}

function signup(username, email, password) {
    
    const requestOptions = { name: username, email, password };
    console.log('SignUp ', requestOptions)
    
    // Here it should be the axios call to the backend. Now I am using mock with username and password, but i should send the complete object
    
    return axios.post('http://localhost:8080/api/auth/signup', requestOptions)
        .then( user => {
            console.log('jony gomaa', user.data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
        })

}