import {FETCH_OUTLET , REGISTER_USER , FETCH_ERROR, LOGIN_USER , PURCHASE_ITEMS , FETCH_USER , CLEAR_ERROR , PURCHASE_SUCCESS , CLEAR_PURCHASE , LOGOUT_USER} from './type';
import axios from 'axios';

//get all outlet infomation
export const fetchOutlet = () => dispatch => {
    axios.get('/api/outlet')
        .then(res=>{
            dispatch({
                type : FETCH_OUTLET,
                payload : res.data
            })
        })
        .catch(err=>console.log(err))
};

//register action
export const registerUser = user => dispatch => {
    axios.post('/api/user/register' , user)
    .then(res=>{
        dispatch({
            type : REGISTER_USER,
            payload : res.data
        })
    })
    .catch(err=>{
        dispatch({
            type : FETCH_ERROR,
            payload : err.response
        })
    })
};

//login action
export const loginUser = user => dispatch => {
    axios.post('/api/user/login' , user)
    .then(res=>{
        dispatch({
            type : LOGIN_USER,
            payload : res.data
        })
    })
    .catch(err=>{
        dispatch({
            type : FETCH_ERROR,
            payload : err.response
        })
    })
};

//buy items action
export const buyItems = items => dispatch => {
    axios.put('/api/purchase' , items)
    .then(res=>{
        dispatch({
            type : PURCHASE_ITEMS,
            payload : res.data
        });
        dispatch({type : PURCHASE_SUCCESS})
    })
    .then(()=>{
        dispatch({type : CLEAR_PURCHASE})
    })
    .catch(err=>{
        dispatch({
            type : FETCH_ERROR,
            payload : err.response
        })
    })
}
//clear error
export const clearError = () => {
    return{
        type : CLEAR_ERROR
    }
}

//logout user
export const logoutUser = () => {
    return{
        type : LOGOUT_USER
    };
};