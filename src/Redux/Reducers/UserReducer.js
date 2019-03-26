const initialState = {
    username: '',
    users: []
}

const SET_USER = 'SET_USER'
const SET_GROUP_USERS = 'SET_GROUP_USERS'

function reducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, username: action.payload}
        case SET_GROUP_USERS:
            let updatedUsers = state.users.concat(action.payload)
            console.log(updatedUsers)
            return {...state, users: updatedUsers}
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

export function setGroupUsers(user){
    console.log(user)
    return {
        type: 'SET_GROUP_USERS',
        payload: user
    }
}

export default reducer