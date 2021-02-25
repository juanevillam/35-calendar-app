import React from 'react';

export const CalendarEvent = ( { event } ) => {
    
    const { title, user } = event;

    return (
        <div>
            <strong className="mr-2">{ title }</strong>
            <i className="fas fa-user-circle"></i>
            <span> { user.name }</span>
        </div>
    );

};
