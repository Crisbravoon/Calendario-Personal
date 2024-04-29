
import { useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';

import { CalendarEventBox, CalendarModal, FabAddDelete, FabAddNew, Navbar } from "../";

import { useCalendarStore, useUiStore } from '../../hooks';
import { localizer, getMessagesES } from '../../helper';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvents } = useCalendarStore();

  //Guarda la ultima vista que se vio en el localStorage.
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style
    }
  };

  const onDoubleClick = (e) => {
    openDateModal();
  };


  const onSelect = (e) => {
    // console.log({ click: e });
    setActiveEvents(e);
  };

  const onViewChange = (e) => {
    console.log({ viewChange: e });
    //El calendario cambia y lo guarda
    localStorage.setItem('lastView', e);
    setLastView(e);
  };

  return (
    <>
      <Navbar />
      <Calendar
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        defaultView={lastView}
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
      />

      <CalendarModal />
      <FabAddNew />
      <FabAddDelete />
    </>
  )
};
