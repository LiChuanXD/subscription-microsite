import { REGISTER_USER , LOGIN_USER , PURCHASE_ITEMS , PURCHASE_SUCCESS , CLEAR_PURCHASE, LOGOUT_USER } from '../actions/type';

const initState = {
    _id : "",
    name : "",
    number : "",
    purchases : [],
    auth : false,
    purchase : false
}

const memberReducer = ( state = initState , action ) => {
    console.log(action);
    switch(action.type){
        case REGISTER_USER:
        case LOGIN_USER:
            return{
                ...state,
                _id : action.payload._id,
                name : action.payload.name,
                number : action.payload.number,
                purchases : [...action.payload.purchases],
                auth : true
            };

        case LOGOUT_USER:
            return{
                ...state,
                _id : "",
                name : "",
                number : "",
                purchases : [],
                auth : false,
                purchase : false
            };

        case PURCHASE_ITEMS:
            return{
                ...state,
                purchases : [...state.purchases , action.payload]
            };

        case PURCHASE_SUCCESS:
            return {
                ...state,
                purchase : true
            };

        case CLEAR_PURCHASE:
            return {
                ...state,
                purchase : false
            };

        default:
            return state;
    };
};

export default memberReducer;