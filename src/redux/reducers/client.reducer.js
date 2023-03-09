const clientDashboard = (state = [], action) => {
    if (action.type === 'SET_CLIENT_DASHBOARD') {
        // console.log('Client Dashboard reducer', action.payload)
        return action.payload;
    } 
    return state;
}

export default clientDashboard;