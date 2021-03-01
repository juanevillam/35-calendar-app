import './AddEvent.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../../../actions/ui';

export const AddEvent = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    };
    
    return (
        <button className="btn add" onClick={ handleClickNew }>
            <i className="fas fa-plus"></i>    
        </button>
    );

};
