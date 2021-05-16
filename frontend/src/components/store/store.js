import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authenticationReducer } from './reducers/authReducer';

export const store = createStore(
    authenticationReducer,
    applyMiddleware(
        thunkMiddleware
    )
)