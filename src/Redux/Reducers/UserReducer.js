const initialState = {
    username: ''
}

const SET_USER = 'SET_USER'

function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, username: action.payload}
        default:
            return state;
    }
}

export function setUser(user){
    return {
        type: 'SET_USER',
        payload: user
    }
} 

export default reducer