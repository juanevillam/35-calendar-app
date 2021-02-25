import moment from 'moment';
import './CalendarScreen.css';
import { Navbar } from '../ui/Navbar';
import React, { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer( moment );
const events = [{
    title: 'Birthday',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#100F10',
    notes: 'Bake the Cake',
    user: {
        id: 'Bake the Cake',
        name: 'Juan',
    }
}];

export const CalendarScreen = () => {

    const [ lastView, setLastView ] = useState(         localStorage.getItem( 'lastView' ) || 'month' );

    const onDoubleClick = ( e ) => {
        console.log( e );
    };

    const onSelectEvent = ( e ) => {
        console.log( e );
    };

    const onViewChange = ( e ) => {
        setLastView( e );
        localStorage.setItem( 'lastView', e );
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#6A26CD',
            borderRadius: '10px',
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
                onView={ onViewChange }
                view={ lastView }
                components={ { event: CalendarEvent } } />  
                <CalendarModal />
                <br />
            </div>
                <br />
        </div>
    );

};

