

import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Estudiar React js',
    notes: 'Entrar al Udemy y aprender',
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: '#fafafa',
    user: {
        uid: '123',
        name: 'Cristobal'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvents: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvents = payload;

        },
        onAddNewEvents: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvents = null;
        },
        onUpdateEvents: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvents: (state) => {
            if (state.activeEvents) {
                state.events = state.events.filter(event => event._id !== state.activeEvents._id);
                state.activeEvents = null;
            }
        },
    }
});

export const {
    onSetActiveEvent,
    onAddNewEvents,
    onUpdateEvents,
    onDeleteEvents } = calendarSlice.actions;