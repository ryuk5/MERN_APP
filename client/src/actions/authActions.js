//1-importing axios
import axios from 'axios';

//9-importing the fn. that will handle our errors
import { returnErrors } from './errorActions';

//2-importing the types need it
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//3-Check token & load user

/** madémna bch nésta3mlolu an async. call lézém nesta3méll él dispatch  
 *  I want to be able to get parts of the state méllé5er 7achti bél token éli houa mawjoud él state
 *  along with dispatch bch n3adi une fn. esmha getState té5ouli él attr. éli 7achti bih mél state
 *  don't forget to wrap dispatch 1st param and getState 2sec param in parentheses
 */
export const loadUser = () => (dispatch, getState) => { //houni 3adina getState 5ater 3ana access él state of redux
    //fn. body                                          //c'est le syxtaxe kiféch i access the state mél actions bté3i

    //4-dispatch user loading 5ater bch njibou mél DB
    //User loading
    dispatch({ type: USER_LOADING }); //we wanna do that b4 anything

    //8-fetching the user
    axios.get('/api/auth/user', tokenConfig(getState)) //zédna 3adina él headers éli zédnéhom lél req
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data //this object contains the user object +token éli nraj3ou fih mél server
        }))
        //if there is an issue
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//Register User action
export const register = ({ name, email, password }) => dispatch => {
    //houni bch nab3thou post req. to the server to register the user
    //Steps
    //1-Headers of the req.
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //2-Req. Body or the Req. Data that we're going to send to the server (éli hiya bch tkoune name, email and password)
    const body = JSON.stringify({ name, email, password });    //esta3malna this method 5ater we're taking a JS object that we want to turn it into JSON Data

    //3-we are ready to make our Req.
    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS, //everything went ok and the user was created
            payload: res.data       //kén nchoufou l api fél serve él response bch tkoune our user object man8ir él pwd + le token all that data is going to the reducer to be set
        }))
        .catch(err => {
            //if something went wrong
            //i wanna dispatch 2 things
            //tawa i wanna use the return errors that we created
            //to dipslay to the user the errors
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            
            dispatch({
                type: REGISTER_FAIL
            });

        });
};

//Login User
export const login = ({ email, password }) => dispatch => {
    //houni bch nab3thou post req. to the server to login the user
    //Steps
    //1-Headers of the req.
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //2-Req. Body or the Req. Data that we're going to send to the server (éli hiya bch tkoune email and password)
    const body = JSON.stringify({ email, password });    //esta3malna this method 5ater we're taking a JS object that we want to turn it into JSON Data

    //3-we are ready to make our Req.
    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS, //everything went ok and the user was created
            payload: res.data       //kén nchoufou l api fél serve él response bch tkoune our user object man8ir él pwd + le token all that data is going to the reducer to be set
        }))
        .catch(err => {
            //if something went wrong
            //i wanna dispatch 2 things
            //tawa i wanna use the return errors that we created
            //to dipslay to the user the errors
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });

        });
};



// Logout User
export const logout = () => { //here we don't need our dispatch 5ater ma faméche communication m3a an external api
    return{ // tfaker ke an action return an object !!! with type and payload (optional)
        type: LOGOUT_SUCCESS
    };
};


/* ------------------------tokenConfig (it's a helper function to get the token)--------------------------------------------------*/
//Setup config/headers and token
export const tokenConfig = getState => {
    //5-Getting the token from local storage
    const token = getState().auth.token; // !!! esta3malt la fn. getState().name_of_reducer.attr !!!

    //6-Adding headers to my req. using axios
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //7-verify if the toekn exists we will add it to the headers
    if (token) {
        config.headers['x-auth-token'] = token; /** ya3ni éna 3andi token fél localStorage 7atinéh fél state
                                                    * zédna 7atina él token éli jébnéh mél localStorage
                                                      fél headers bta3 él req éli bch tétb3ath lél server*/
    }

    return config;
}

/** 1-our fnc. tokenConfig take the getState as a parameter 
 *  5ater getState hiya él fn. éli bch téjbédli él token mél redux state bté3i
 *  2-Now any time we need to send the token to a certain endpoint we just simply call 
 *  tokenConfig(getState) like we did in the axios fél star 34 
 *   axios.get('/api/auth/user', tokenConfig(getState))
 * 
 *  7ata law in diff. file we just import it 5ater here we are exporting it and then use it
*/

/* ------------------------end tokenConfig--------------------------------------------------*/