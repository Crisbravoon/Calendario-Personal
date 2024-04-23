
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';

import { CalendarEventBox, CalendarModal, Navbar } from "../";
import { localizer, getMessagesES } from '../../helper';

import { addHours } from 'date-fns';
import { useState } from 'react';


const events = [{
  title: 'Estudiar React js',
  notes: 'Entrar al Udemy y aprender',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#fafafa',
  user: {
    uid: '123',
    name: 'Cristobal'
  }
}];

export const CalendarPage = () => {

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
    console.log({ doubleClick: e });
  };


  const onSelect = (e) => {
    console.log({ click: e });
  };

  const onViewChange = (e) => {
    console.log({ viewChange: e });

    //El calendario cambia y lo guarda
    localStorage.setItem('lastView', e);
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
    </>
  )
};
