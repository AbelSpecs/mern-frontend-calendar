import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import '../../style.css';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import {useDispatch,useSelector} from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventCleanActiveEvent, eventStartUpdate, eventUpdated, startEventAddNew } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root');

const nowDate = moment().minutes(0).seconds(0).add(1,'hours');
const endDate = moment(nowDate).minutes(0).seconds(0).add(1,'hours');


const initEvent = {
    title: '',
    notes: '', 
    start: nowDate.toDate(),
    end: endDate.toDate()   
}

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);

    const [dateStart, setDateStart] = useState(nowDate.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [validTitle, setValidTitle] = useState(true);

    const [values, setValues, handleInputChange, handleDateChange, reset] = useForm(initEvent);

    const {title, notes, start, end} = values;

    useEffect(() => {
        if(activeEvent){
            setValues(activeEvent)
            
        }

        
    }, [activeEvent, setValues]);
    

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventCleanActiveEvent());
        
        reset(initEvent);
    }

    const handleStartDateChange  = (e) => {
        setDateStart(e);
        handleDateChange(e, 'start');
        console.log(e);
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        handleDateChange(e, 'end');
        console.log(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            console.log("La fecha final no ser igual o menor que la inicial");
            Swal.fire('Error', 'La fecha fin no puede ser menor o igual a la fecha de inicio', 'error');
            return;
        }

        if(title.trim().length < 2){
            setValidTitle(false);
        }else{
            setValidTitle(true)
        }

        if(activeEvent){
            dispatch(eventStartUpdate(values))
        }else{

            dispatch(startEventAddNew(values));
        }

        
    }

    return (
        <Modal
          isOpen={modalOpen}
          /* onAfterOpen={afterOpenModal} */
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          closeTimeoutMS={200}
          className="modal"
          overlayClassName="modal-fondo"
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!validTitle && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
