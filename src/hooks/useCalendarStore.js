

import { onAddNewEvents, onDeleteEvents, onSetActiveEvent, onUpdateEvents } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvents } = useSelector(state => state.calendar);

    const setActiveEvents = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        if (activeEvents._id) {
            //Actualizando
            dispatch(onUpdateEvents({ ...calendarEvent }));
        } else {
            //Creando
            dispatch(onAddNewEvents({ ...calendarEvent, _id: new Date().getTime() }));
        }
    };

    const startDeletingEvents = () => {
        dispatch(onDeleteEvents());
    };

    return {

        //Propiedades
        activeEvents,
        events,
        hasEventSelected: !!activeEvents,

        //Metodos
        setActiveEvents,
        startDeletingEvents,
        startSavingEvent
    }
};
