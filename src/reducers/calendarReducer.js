import moment from 'moment'
import { types } from '../types/types';

/* {
    id: new Date().getTime(),
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user: {
       _id: '123',
       name: 'El topo'
    }
} */



const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

    switch(action.type){
 
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]

            }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }

        case types.eventCleanActiveEvent:
            return{
                ...state,
                activeEvent: null
            }

        case types.eventStartLoading:
            return{
                ...state,
                events: [...action.payload]
            }

        case types.eventCleanLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }

}