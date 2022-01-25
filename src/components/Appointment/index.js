import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import axios from 'axios';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const bookInterview = (id, interview) => {
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {setState({...state, appointments, days});
    transition(SHOW);
    return res;})
    
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {setState({...state, appointments, days});
      return res});
  }

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true));
  }

  const deleting = () => {
    transition(DELETE, true);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true))
  }

  const confirmation = () => {
    transition(CONFIRM);
  }

  const edit = () => {
    transition(EDIT);
  }



    return (
        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} bookInterview={props.bookInterview}/>}
            {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={props.interviewers} bookInterview={props.bookInterview}/>}
            {mode === SHOW && (
              <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              bookInterview={props.bookInterview}
              />
            
            )}
            {mode === SAVING && <Status message="Saving"/>}
            {mode === DELETE && <Status message="Deleting"/>}
            {mode === CONFIRM && (
              <Confirm 
              onConfirm={() => deleting()}
              onCancel={back}
              message="Are you sure you want to delete this?"
              />)}
            {mode === EDIT && (
              <Form 
              name={props.interview.student}
              interviewer={props.interview.interviewer.id}
              interviewers={props.interviewers}
              onSave={save}
              onCancel={back}
              />)}
        </article>
    );
}

//<h1>{props.time ? `${props.time}` : "No appointments"}</h1>
//<Header time={props.time} />