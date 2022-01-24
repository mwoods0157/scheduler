export default function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    const array = [];
    for (const d of state.days) {
        if (d.name === day) {
            const appointment = d.appointments;
            for (const a of appointment) {
                for (const b in state.appointments) {
                     if (a == b) {
                        array.push(state.appointments[b]);
                    }
                }
            }
        }
        
    }
    return array;
}

export function getInterview(state, interview) {
    if(!interview.interviewer) {
        return null;
    } else {
        for (const i in state.interviewers) {
            if (i == interview.interviewer.id) {
                return interview;
            }
        }
    }
}

export function getInterviewersForDay(state, day) {
    const result = [];
    const days = state.days;
    if (state.days.length < 1) {
        return result;
    }
    let interviewersForDay;

    for (const day of days) {
        if (day.name === day) {
            interviewersForDay = day.interviewers;
            if (!interviewersForDay) {
                return result;
            }
        }
    }

    for (const id of interviewersForDay) {
        result.push(state.interviewers[id]);
    }

    return result;
}





