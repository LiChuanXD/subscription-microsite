import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import outletReducer from './outletReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    member : memberReducer,
    outlet : outletReducer,
    error : errorReducer
});

export default rootReducer;