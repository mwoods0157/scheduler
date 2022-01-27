import React from 'react';
import DayListItem from './DayListItem';

export default function DayList({days, value, onChange}) {
    //console.log(days);
    return (
        <ul>
            {days.map((day) => (
                <DayListItem key={day.id} 
                name={day.name} 
                spots={day.spots}
                selected={day.name === value}
                setDay={onChange}
                {...day}
                />
            ))}
        </ul>
    );
}