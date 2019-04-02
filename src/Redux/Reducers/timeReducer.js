const initialState = {
    time: 1,
    pause: '',
    userInput: ''
}

const PLAY_PAUSE_VIDEO = 'PLAY_PAUSE_VIDEO'
const SEND_TIME = 'SEND_TIME'
const UPDATE_INPUT = 'UPDATE_INPUT'

function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_INPUT:
            state.userInput = action.payload
            return {...state}
        case PLAY_PAUSE_VIDEO:
            state.time = action.payload
            state.pause === 'autoplay=1&'
                ? state.pause = ''
                : state.pause = 'autoplay=1&'
            return {...state}
        case SEND_TIME:
            state.time = action.payload
            return {...state}
        default:
            return state;
    }
}

export function sendTime (newTime) {
    return {
        type: 'SEND_TIME',
        payload: newTime
    }
}

export function playPauseVideo (newTime){
    return {
        type: 'PLAY_PAUSE_VIDEO',
        payload: newTime
    }
}

export function updateInput (newTime){
    return {
        type: 'UPDATE_INPUT',
        payload: newTime
    }
}

export default reducer