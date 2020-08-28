//For communicating with the back-end 
//1-import axios
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions'; //I wanna also be able to return errors if something goes wrong i want to put it in the error state (to display errors to the users)

//2-add the dispatch with this syntax (this is where thunk comes in to make async. req)
//we will use the dispatch to send the type along with the data that we get from our req.
export const getItems = () => dispatch => {
    //3-we call the setItemLoading() to set the value of loading to true 
    //ya3ni 9a3ed njib fi data from an api
    //we will call dispatch and pass to it any of our actions
    dispatch(setItemsLoading());

    //4-then we wanna make our req to the back-end
    axios.get('/api/items') //that call will return a promise
        .then(res => {
            //houni kél data jétna from our server
            dispatch({ //houni dispatch will take an object fih el type of the actions + a payload fih él data éli jébnéha mél server
                type: GET_ITEMS,
                payload: res.data
            }) 
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
        //5-go to the reducer and make look at the code

};

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
        //we take care from deleting the post from the DB and the UI by sending an action to the reducer
};

export const addItem = (item) => (dispatch, getState) => {
    axios.post('/api/items', item, tokenConfig(getState)) //we are making a post req. so we are passing some data
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data //we are sending to the reducer the new item that was inserted in the DB
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}