import React from 'react';
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
    const listItemClass = classNames('interviewers__item', {"interviewers__item--selected": props.selected});
    //console.log(props);

    return (
        <li className={listItemClass} key={props.id} onClick={props.setInterviewer}>
            <img
            className="interviewers__item-image"
            src={props.avatar}
            alt={props.name}
            />
        {props.selected && props.name}
        </li>
    );
}
//props.setInterviewer(props.id)