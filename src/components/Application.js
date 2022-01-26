import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
//import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import getAppointmentsForDay, { getInterviewersForDay, getInterview } from "helpers/selectors";
//import getInterview from "helpers/selectors";

import "components/Application.scss";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: []
    
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  

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
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments ={
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {setState({...state, appointments});
      return res});
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {setState({...state, appointments});
    return res;
    })
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //const interviewers = getInterviewersForDay(state, state.day);
  console.log('getInterviewersForDay', state);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("getInterview", interview);
    const interviewers = getInterviewersForDay(state, state.day);
    console.log("interviewers", getInterviewersForDay(state, state.day));
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
        />
        
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {
          schedule
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
