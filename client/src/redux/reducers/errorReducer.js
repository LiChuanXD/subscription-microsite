import { FETCH_ERROR , CLEAR_ERROR } from '../actions/type';

const initState = {
    msg : "",
    showError : false
};

const errorReducer = ( state=initState , action ) => {
    console.log(action);
    switch(action.type){
        case FETCH_ERROR:
            return{
                ...state,
                msg : action.payload.data.msg,
                showError : true
            };

        case CLEAR_ERROR:
            return{
                ...state,
                msg : "",
                showError : false
            };

        default:
            return state;
    };
};

export default errorReducer;