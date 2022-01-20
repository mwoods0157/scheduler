import React from 'react';
import "components/Appointment/index"


export default function Appointment(props) {
    return (
        <article className="appointment">
            <h1>{props.time ? `Appointment at ${props.time}` : "No appointments"}</h1>
            
        </article>
    );
}