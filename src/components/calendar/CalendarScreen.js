import moment from 'moment';
import './CalendarScreen.css';
import { Navbar } from '../ui/Navbar';
import React, { useState } from 'react';
import { uiOpenModal } from '../../actions/ui';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './modal/CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AddEvent } from '../ui/buttons/addEvent/AddEvent';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { eventSetActive, eventClearActiveEvent } from '../../actions/events';

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events } = useSelector( state => state.calendar );

    const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = ( e ) => {
        dispatch( eventSetActive( e ) );
    };

    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent( e ) );
    };

    const onViewChange = ( e ) => {
        setLastView( e );
        localStorage.setItem( 'lastView', e );
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#6A26CD',
            borderRadius: '5px',
            opacity: 0.8,
            display: 'block',
            color: '#F7F7FE'
        }

        return {
            style
        };

    };
    
    return (
        <div className="calendarScreen">
            <Navbar />
            <div className="calendarScreen__calendar">
                <Calendar
                localizer={ localizer } 
                events={ events } 
                startAccessor="start" 
                endAccessor="end" 
                eventPropGetter={ eventStyleGetter } 
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                components={ { event: CalendarEvent } } />  
                <AddEvent />
                <CalendarModal />
                <br />
            </div>
                <br />
        </div>
    );

};

