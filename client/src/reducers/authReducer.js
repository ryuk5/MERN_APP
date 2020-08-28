import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('toekn'), //we will get the token from local Storage if there is one set
    isAuthenticated: null,
    isLoading: false, //if the user is loading
    user: null //the user itself
};

export default function (state = initialState, action) {
    //we will evaluate the action type
    switch (action.type) {
        case USER_LOADING: /** The USER_LOADING is just the point from where 
                             *we're trying to get the user from the backend 
                             *to the point to where we actually fetch the user
                             */
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED: //once the user is loaded , this USER_LOADED is gonna run basically all the time with every req. to see if we're logged in or not !!!!!!!
            //inajém iétna7a él token so lézém dima we check if we're logged in or not
            return {
                ...state,
                isAuthenticated: true, //we were validate it on the back end and we got the user
                isLoading: false,
                user: action.payload //we will send the user as the payload
            };

        case LOGIN_SUCCESS: //bél nesba lél LOGIN_SUCCESS && REGISTER_SUCCESS we will do the same thing
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload, //this is what we're sneding from the backend an object wich contains the user éli houa object and the token
                isAuthenticated: true, //we were validate it on the back end and we got the user
                isLoading: false
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token'); //ina7i él token mél local storage
            return {
                ...state,
                token: null, //setting the state
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        default:
            return state;
    }
}