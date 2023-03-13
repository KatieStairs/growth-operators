
// all assessment answers reducer
const assessmentAnswersList = (state = [], action) => {
    if (action.type === 'SET_ASSESSMENT_ANSWERS') {
        return action.payload;
    } 
    return state;
}

export default assessmentAnswersList;