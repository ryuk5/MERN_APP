import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// 1- This is the variable representing our initial state (the state of the sotre)
const initialState = {};

// 2- We will create a variable for the middleware
const middleware = [thunk]; // aye middleware that we gonna use we should put it in that array

// 3- Creation of the store , this function will take 3 params
// params : 1- the rootReducer, our initialState, it will take any middleware but since we are 
//using Redux tools we want to wrap the applyMiddleware in the function called compose() we want to pass it in 
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware), //n3adiou tous les middleware weste él array bt3éna houni en utilisant le spread operator
    //in ordre to use the redux dev toolswe have to write a line of code
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)); 

export default store;
