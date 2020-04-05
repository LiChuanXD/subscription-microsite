import { REGISTER_USER , USER_ERROR , LOGIN_USER , FETCH_USER } from '../actions/type';

const initState = {
    _id : "",
    name : "",
    number : "",
    purchases : [],
    auth : false,
    error : ""
}

const memberReducer = ( state = initState , action ) => {
    console.log(action);
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state,
                _id : action.payload._id,
                name : action.payload.name,
                number : action.payload.number,
                purchases : [...action.payload.purchases],
                auth : true,
                error : ""
            };

        case USER_ERROR:
            return{
                ...state,
                error : action.payload.data.msg
            };

        case LOGIN_USER:
            return{
                ...state,
                _id : action.payload._id,
                name : action.payload.name,
                number : action.payload.number,
                purchases : [...action.payload.purchases],
                auth : true,
                error : ""
            };

        case FETCH_USER:
            return{
                ...state,
                _id : action.payload._id,
                name : action.payload.name,
                number : action.payload.number,
                purchases : [...action.payload.purchases],
                auth : true,
                error : ""
            };

        default:
            return state;
    }
};

export default memberReducer;