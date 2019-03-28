const initialState = {
    username: '',
    users: [],
    userLogOut: ''
}

const SET_USER = 'SET_USER'
const SET_GROUP_USERS = 'SET_GROUP_USERS'
const USER_LEAVE = 'USER_LEAVE'
const USER_LOGOUT = 'USER_LOGOUT'

function reducer(state = initialState, action){
    switch(action.type){
        case USER_LOGOUT:
            return {...state, userLogOut: action.payload}
        case SET_USER:
            return {...state, username: action.payload}
        case SET_GROUP_USERS:
            let updatedUsers = state.users.concat(action.payload)
            return {...state, users: updatedUsers}
        case USER_LEAVE:
            let userLeft = state.users.splice(action.payload, 1)
            return {...state, user: userLeft}
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

export function userLeft (index){
    console.log(index)
    return {
        type: 'USER_LEAVE',
        payload: index
    }
}

export function userLogOut (user){
    return {
        type: 'USER_LOGOUT',
        payload: user
    }
}

export default reducer