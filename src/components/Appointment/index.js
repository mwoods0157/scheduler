import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import axios from 'axios';

const EMPTY = "EMPTY";
const SHOW = "SHOW";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {setState(state), transition(SHOW)}
    )}

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(props.id, interview);
  }

  const deleting = () => {
    transition(DELETE, true);
    props.cancelInterview(props.id)
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
        </article>
    );
}

//<h1>{props.time ? `${props.time}` : "No appointments"}</h1>
//<Header time={props.time} />