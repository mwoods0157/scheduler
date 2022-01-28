export default function getAppointmentsForDay(state, day) {
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
    let interviewersObj = state.interviewers;
    let results = {};
    
    if(!interview || !interviewersObj) {
        return null;
    } 
        
    for (const key of Object.keys(interviewersObj) ) {
            let interviewer = interviewersObj[key];
            
            if (interviewer.id === interview.interviewer) {
                results['interviewer'] = interviewer;
                results['student'] = interview.student;
            }
        }
    return results;
}

export function getInterviewersForDay(state, day) {
    const result = [];
    const days = state.days;
    let interviewersForDay = [];
    
    for (const d of days) {
        if (d.name === day) {
            interviewersForDay = d.interviewers;
            
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








