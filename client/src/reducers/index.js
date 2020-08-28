/** This is our root reducer */
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer  from './errorReducer';
import authReducer from './authReducer';

//for this function we will pass an object that represents 
//all of our reducers
export default combineReducers({
    item: itemReducer, //Wéste él other components on référe lél reducer héda b item
    error: errorReducer,
    auth: authReducer
});