
const assessmentAnswersList = (state = {}, action) => {
    if (action.type === 'SET_ASSESSMENT_ANSWERS') {
        console.log('sldkfhlksadhf', action.payload)
        return action.payload;
    } 
    return state;
}

export default assessmentAnswersList;