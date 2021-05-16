import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT
} from '../constants/userConstants'
import { userService } from '../../../services/userService';
import { history } from '../../helpers/customHistory';

export const userActions = {
    login, 
    signup
};

export function login(username, password, from) {
    console.log('From in login ', from);
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                    
                    history.go();
                },
                error => {
                    dispatch(failure(error.toString()));
                }
        )
    };

    function request(user) { return { type: LOGIN_REQUEST, user } }
    function success(user) { return { type: LOGIN_SUCCESS, user } }
    function failure(error) { return { type: LOGIN_FAILURE, error } }
}

export function signup(username, email, password, from) {
    console.log('From in signup ', from);
    return dispatch => {
        dispatch(request({ username }));

        userService.signup(username, email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                    
                    history.go();
                },
                error => {
                    dispatch(failure(error.toString()));
                }
        )
    };

    function request(user) { return { type: SIGNUP_REQUEST, user } }
    function success(user) { return { type: SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: SIGNUP_FAILURE, error } }
}