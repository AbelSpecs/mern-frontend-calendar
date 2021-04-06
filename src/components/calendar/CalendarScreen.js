import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../ui/Navbar';
import {messages} from '../../helpers/calendar-messages-español'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import {useDispatch, useSelector} from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es'); 

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);
    

    const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'month');

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#800080',
            borderRadius: '0',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {style};
    }

    useEffect(() => {
        dispatch(eventStartLoading())
        
    }, [dispatch])

    const onDobleClick = (e) => {
        console.log(e);
        dispatch(uiOpenModal());
    }
    
    const onSelectEvent = (e) => {
        console.log(e);
        dispatch(eventSetActive(e));
    }
    
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastview', e);
    }

    const onSelectSlot = () => {
        dispatch(eventCleanActiveEvent());
    }

    return (
        <div>
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={[...events]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}

            />

            <AddNewFab/>

            {
               (activeEvent) && (<DeleteEventFab/>) 
            }
            
            <CalendarModal/>
        </div>
    )
}
