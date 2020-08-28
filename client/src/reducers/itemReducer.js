import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

//This function éli hiya it's our reducer té5ou 2 params
//le 1er parap éli houa state of the store éli 3tinéh initialState value
//le 2éme param éli houa él action éli houa object ou 3andou type prop 
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload, //6-we will set the items éli jéouna mél backend
                loading: false //7-set the loading value to false 5ater a ce point data jétna from our backend
                               //tanséche 9bal él req. 3aitna lél dispatch(setItemsLoading()); éli radette our value true 
            }

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => {
                    return action.payload !== item._id //Remarque: mongoDb have an _id field
                })
            }

        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }

        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}