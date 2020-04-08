import {FETCH_OUTLET} from '../actions/type';

const initState = {
    avenue : "",
    live : "",
    day : "",
    pro : ""
};

const outletReducer = ( state=initState , action ) => {
    console.log(action);
    switch(action.type){
        case FETCH_OUTLET:
            return{
                ...state,
                avenue : action.payload[0],
                live : action.payload[1],
                day : action.payload[2],
                pro : action.payload[3]
            }

        default:
            return state
    }
};

export default outletReducer;