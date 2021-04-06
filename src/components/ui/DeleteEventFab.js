import React from 'react'
import {useDispatch} from 'react-redux';
import { eventDeleted, eventStartDelete } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(eventStartDelete())
    }

    return (
        <div>
            <button className="btn btn-danger fab-danger" onClick={handleClick}>
                <i className="fas fa-trash"></i>
                <span>Borrar Evento</span>
            </button>
        </div>
    )
}
