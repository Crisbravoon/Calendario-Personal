
import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';

import Swal from 'sweetalert2';

import { useCalendarStore, useUiStore } from '../../hooks';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvents, startSavingEvent } = useCalendarStore()

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValue, setFormValue] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    //Se valida si el titulo esta correcto o no.
    const titleClass = useMemo(() => {
        //Si no se dispara devuelve string vacio
        if (!formSubmitted) return '';

        return (formValue.title.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValue, formSubmitted]);

    //Mostrara el contenido dele vento  siempre cuando no sea null
    useEffect(() => {
        if (activeEvents !== null) {
            setFormValue({ ...activeEvents });
        }
    }, [activeEvents]);

    const onInputChange = ({ target }) => {
        setFormValue({
            ...formValue,
            //Actualiza el valor que viene del value.
            [target.name]: target.value,
        })
    };

    const onDateChange = (event, changing) => {
        setFormValue({
            ...formValue,
            //Actualiza el valor que viene del value.
            [changing]: event
        });
    };

    //Cierrra el modal
    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        //El fomulario se intento postear.
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValue.end, formValue.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire({
                title: "Fecha Invalida.",
                text: "Revisar fecha ingresada.",
                icon: "error"
            })
            return;
        };

        if (formValue.title.length <= 0) {
            Swal.fire({
                title: "Ingrese un titulo.",
                icon: "error"
            })
            return;
        };

        await startSavingEvent(formValue);
        closeDateModal();
        setFormSubmitted(false);
    };

    return (
        <Modal
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}>
            <h1> Nuevo evento 📜</h1>
            <hr />
            <form className="container" onSubmit={onSubmit} >
                <div className="customDatePickerWidth mb-2">
                    <label >Fecha y hora inicio</label>
                    <DatePicker
                        locale={es}
                        timeCaption='Inicio'
                        className='form-control'
                        minDate={formValue.start}
                        selected={formValue.start}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        onChange={(event) => onDateChange(event, 'start')}
                        showTimeSelect
                    />
                </div>

                <div className="customDatePickerWidth mb-2">
                    <label>Fecha y hora fin</label>

                    <DatePicker
                        locale={es}
                        timeCaption='Termino'
                        className="form-control"
                        minDate={formValue.start}
                        selected={formValue.end}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        onChange={(event) => onDateChange(event, 'end')}
                        showTimeSelect
                    />

                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValue.notes}
                        onChange={onInputChange}
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
