import { createStore, combineReducers } from 'redux';
import UserReducer from './Reducers/UserReducer'

const rootReducer = combineReducers({
    user: UserReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;