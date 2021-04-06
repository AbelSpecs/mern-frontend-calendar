
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventCleanLogout } from "./events";


export const authStartLogin = (email, password) => {
    return async(dispatch) => {
        
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})


export const authstartRegister = (name , email, password) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('auth/new', {name, email, password}, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime()); 
            
            dispatch(register({
                uid: body.uid,
                name: body.name
            }))
        }else{
            Swal.fire('Error', body.msg, 'error');
        }

        
    }
}   

const register = (user) => ({
    type: types.authStartRegister,
    payload: user
})

export const authCheckingFinish = () => {
    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime()); 
            
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            dispatch(cheking());
        }

    }
}

const cheking = () => ({
    type: types.authCheckingFinish
})

export const authStartLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());
        dispatch(eventCleanLogout());
    }
}

const logout = () => ({
    type: types.authLogout
})