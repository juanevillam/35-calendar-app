import './Navbar.css';
import React from 'react';

export const Navbar = () => {
    
    return (
        <div className="navbar mb-4">
            <div>
                <i className="fas fa-user"></i>
                <span className="navbar-brand ml-2">Juan</span>
            </div>
            <button className="btn btn-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Sign out</span>
            </button>
        </div>
    );

};
