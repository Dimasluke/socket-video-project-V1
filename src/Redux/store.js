import { createStore, combineReducers } from 'redux';
import UserReducer from './Reducers/UserReducer'
import RoomReducer from './Reducers/RoomReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    room: RoomReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;