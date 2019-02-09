const initialState = {
    user: 0
}

const countReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AUTH':
            return {...state}
        default:
            return state;
    }
}

export default countReducer;