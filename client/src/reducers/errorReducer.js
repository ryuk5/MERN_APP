//1-Importing the types
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

//2-Creating our initialState
const initialState = {
    msg: {}, //"él msg attr. comes from the server"
    status: null, //that comes from the server par défaut yé5ou null
    id: null //if we wanna to grab a certain error and do something within the component
}

//3-exporting the reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return { //returning an object
                msg: action.payload.msg, //comes from the server
                status: action.payload.status,
                id: action.payload.id //not all errors have id sa3at 7achétna énna we target specidic error to do something within the component
            };

        case CLEAR_ERRORS:
            return {
                //we will set everything back to  default
                msg: {},
                status: null,
                id: null
                //==>we don't want the old errors hanging arround in our state
            };

        default: //just returning the state
            return state;
    }
}