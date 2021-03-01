import './Navbar.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { DeleteEvent } from './buttons/deleteEvent/DeleteEvent';

export const Navbar = () => {
    
    const { activeEvent } = useSelector( state => state.calendar );

    return (
        <div className="navbar mb-4">
            <div>
                <i className="fas fa-user"></i>
                <span className="navbar-brand ml-2">Juan</span>
            </div>
            {
                ( activeEvent ) && <DeleteEvent />
            }
            <button className="btn btn-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Sign out</span>
            </button>
        </div>
    );

};
