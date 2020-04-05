import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import outletReducer from './outletReducer';

const rootReducer = combineReducers({
    member : memberReducer,
    outlet : outletReducer
});

export default rootReducer;