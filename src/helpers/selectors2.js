export default function getInterview(state, interview) {
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