import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareDate } from "../helpers/prepareDate";
import { types } from "../types/types";

export const startEventAddNew = (event) => {
    return async(dispatch, getState) => {
        
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            const {uid, name} = getState().auth;

            console.log(body);
            if(body.ok){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventCleanActiveEvent = () => ({
    type: types.eventCleanActiveEvent
})

export const eventStartUpdate = (event) => {
    return async(dispatch, getState) => {

        console.log(event.id);
        const {uid, name} = getState().auth;
        
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
    
            if(body.ok){
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);

        }
    }
}

const eventUpdated = (event) => ({
     type: types.eventUpdated,
     payload: event
})

export const eventStartDelete = () => {
    return async(dispatch, getState) => {
        
        const eventId = getState().calendar.activeEvent.id;

        try {
            const resp = await fetchConToken(`events/${eventId}`, {}, 'DELETE');
            const body = await resp.json();
            console.log(body);
            
            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepareDate(body.eventos);
            dispatch(eventsLoaded(events));
            
        } catch (error) {
            console.log(error);
        }

        
    }
}

const eventsLoaded = (events) => ({
    type: types.eventStartLoading,
    payload: events
})

export const eventCleanLogout = () => ({
    type: types.eventCleanLogout,
})