import React from 'react';
import InterviewerListItem from './InterviewerListItem';

import 'components/InterviewerList.scss'

export default function InterviewerList({interviewers, onChange, value}) {
    
    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {interviewers.map((interview) => (
                    <InterviewerListItem key={interview.id}
                    name={interview.name}
                    avatar={interview.avatar}
                    selected={value === interview.id}
                    setInterviewer={() => onChange(interview.id)}
                    />
                ))}
            </ul>
        </section>
    );
}

