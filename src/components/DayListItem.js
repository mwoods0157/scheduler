import React from 'react';
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
    const listItemClass = classNames('day-list__item', {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots === 0});
    
    const formatSpots = (val) => {
        if (val === 0) {
            return "no spots remaining";
        } else if (val === 1) {
            return "1 spot remaining";
        } else {
            return val + " spots remaining";
        }
    }

    return (
        <li onClick={() => props.setDay(props.name)} className={listItemClass} selected={props.selected}>
            <h2 className='text--regualar'>{props.name}</h2>
            <h3 className='text--light'>{formatSpots(props.spots)}</h3>
        </li>
    );
}