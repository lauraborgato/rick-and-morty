import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_FAILURE, 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS,
} from '../constants/userConstants'

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { user } : {};

export function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                // loggingIn: true,
                user: action.user
            };
    
        case LOGIN_SUCCESS:
            return {
                // loggedIn: true,
                user: action.user
            };
    
        case LOGIN_FAILURE:
            return {};

        case SIGNUP_REQUEST:
            return {
                user: action.user
            }
        
        case SIGNUP_SUCCESS: 
            return {
                user: action.user
            }

        case SIGNUP_FAILURE:
            return {};
    
        default:
            return state
    }
}