import {FETCH_OUTLET} from '../actions/type';

const initState = {};

const outletReducer = ( state=initState , action ) => {
    console.log(action);
    switch(action.type){
        case FETCH_OUTLET:
            return{
                ...state,
                ...action.payload
            }

        default:
            return state
    }
};

export default outletReducer;