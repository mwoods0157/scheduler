import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
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
  };

  const deleting = () => {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true));
  };

  const confirmation = () => {
    transition(CONFIRM);
  }

   const edit = () => {
     transition(EDIT);
   }
  


    return (
        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={props.interviewers}/>} 
            {mode === SHOW && (
              <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete={() => confirmation()}
              onEdit={() => edit()}
              />
            
            )}
            {mode === SAVING && <Status message="Saving"/>}
            {mode === DELETING && <Status message="Deleting"/>}
            {mode === CONFIRM && (
              <Confirm 
              onConfirm={() => deleting()}
              onCancel={back}
              message="Are you sure you want to delete this?"
              />)}
            {mode === EDIT && (
              <Form 
              student={props.interview.student}
              interviewer={props.interview.interviewer.id}
              interviewers={props.interviewers}
              onSave={save}
              onCancel={back}
              />)}
        </article>
    );
}

