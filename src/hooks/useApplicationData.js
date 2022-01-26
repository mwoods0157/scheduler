import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        interviewers: {},
        appointments: []
    });

    const getDayIndex = (dayStr) => {
        const days ={
            "Monday": 0,
            "Tuesday": 1,
            "Wednesday": 2,
            "Thrusday": 3,
            "Friday": 4
        }
        return days[dayStr];
    }

    const setDay = day => setState({ ...state, day });

    useEffect(() => {
        Promise.all([
          axios.get("api/days"),
          axios.get("api/appointments"),
          axios.get("api/interviewers")
        ]).then((all) => {
          //setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
          const [days, appointments, interviewers] = all;
           setState(prev => ({
             ...prev,
             days: days.data,
             appointments: appointments.data,
             interviewers: interviewers.data
           }));
        });
    }, []);

    function cancelInterview (id) {
        let today = getDayIndex(state.day);

        const appointment = {
          ...state.appointments[id],
          interview: null
        }
    
        const appointments ={
          ...state.appointments,
          [id]: appointment
        }

        const daySpots = {
          ...state.days[today],
          spots: state.days[today].spots + 1
        }

        let days = [...state.days];
        days[today] = daySpots;
    
        return axios.delete(`/api/appointments/${id}`)
        .then((res) => {setState({...state, appointments, days});
          return res});
    }

    const bookInterview = (id, interview) => {
        let today = getDayIndex(state.day);

        const appointment = {
          ...state.appointments[id],
          interview: {...interview}
        };
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        //Start tracking the spots with daySpots
        let daySpots = {
          ...state.days[today],
          spots: state.days[today]
        }
        //If we are booking an interview, the reduce the spots for that day by 1
        if(!state.appointments[id].interview) {
            //If creating, reduce spots by one
            daySpots = {
                ...state.days[today],
                spots: state.days[today].spots - 1
                };
            } else {
                //If editing, you don't have to reduce spots
                daySpots = {
                    ...state.days[today],
                    spots: state.days[today].spots
                };
            }

        let days = [...state.days];
        days[today] = daySpots;

        return axios.put(`/api/appointments/${id}`, {interview})
        .then((res) => {setState({...state, appointments, days});
        return res;
        })
    }

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview
    };
}