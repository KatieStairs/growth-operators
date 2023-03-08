
const assessmentAnswersById = (state = {}, action) => {
    if (action.type === 'SET_ASSESSMENT_ANSWERS_BY_ID') {
        return action.payload;
    }
    return state;
}



export default assessmentAnswersById;
