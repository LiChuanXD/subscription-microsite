import {FETCH_OUTLET , REGISTER_USER , USER_ERROR, LOGIN_USER , PURCHASE_ITEMS , FETCH_USER} from './type';
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
            type : USER_ERROR,
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
            type : USER_ERROR,
            payload : err.response
        })
    })
};

export const buyItems = items => dispatch => {
    axios.put('/api/purchase' , items)
    .then(res=>{
        dispatch({type : PURCHASE_ITEMS});
    })
    .catch(err=>console.log(err))
}

export const fetchUser = param => dispatch => {
    axios.get(`/api/user/${param}`)
    .then(res=>{
        dispatch({
            type : FETCH_USER,
            payload : res.data
        })
    })
    .catch(err=>console.log(err))
}