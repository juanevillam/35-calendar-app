import moment from 'moment';
import './CalendarModal.css';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { uiCloseModal } from '../../../actions/ui';
import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useSelector, useDispatch } from 'react-redux';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../../actions/events';

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement( '#root' );

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' );
const nowPlus1 = now.clone().add( 1, 'hours' );

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
};

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const [ titleValid, setTitleValid ] = useState( true );
    const [ formValues, setFormValues ] = useState( initEvent );

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    
    const { title, notes, start, end } = formValues;

    useEffect( () => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [ activeEvent, setFormValues ]);

    const handleInputChange = ( { target } ) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });
    };

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );
    };

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        });
    };

    const handleSubmitForm = ( e ) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire( 'Error', 'The end date must be greater than the start date.', 'error' );
        };

        if ( title.trim().length < 4 ) {
            return setTitleValid( false );
        };

        if ( activeEvent ) {
            dispatch( eventUpdated( formValues ) );
        } else {
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Juan'
                }
            }) );
        };

        setTitleValid( true );
        closeModal();
    };

    return (
        <Modal isOpen={ modalOpen } onRequestClose={ closeModal } style={ customStyles } closeTimeoutMS={ 200 } className="modal" overlayClassName="modal-background">
            <h1 className="text-center">{ (activeEvent ) ? 'Edit Event' : 'New Event' }</h1>
            <hr />
            <form className="container" onSubmit={ handleSubmitForm } >
                <div className="form-group">
                    <label className="mr-2">Start date and time</label>
                    <DateTimePicker className="form-group" onChange={ handleStartDateChange } value={ dateStart } />
                </div>
                <div className="form-group">
                    <label className="mr-2">End date and time</label>
                    <DateTimePicker className="form-group" onChange={ handleEndDateChange } value={ dateEnd } minDate={ dateStart } />
                </div>
                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input type="text" className={ `form-control ${ !titleValid && 'is-invalid' }` } placeholder="Event title" name="title" autoComplete="off" value={ title } onChange={ handleInputChange } />
                    <small id="emailHelp" className="form-text text-muted">A short description</small>
                </div>
                <div className="form-group">
                    <textarea type="text" className="form-control" placeholder="Notes" rows="3" name="notes" value={ notes } onChange={ handleInputChange }></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional Information</small>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    <i className="fas fa-save mr-1"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    );

};
