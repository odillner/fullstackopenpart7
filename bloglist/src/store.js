import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notification'
import sessionReducer from './reducers/session'
import blogsReducer from './reducers/blogs'
import usersReducer from './reducers/users'

const reducer = combineReducers({
    notification: notificationReducer,
    session: sessionReducer,
    blogs: blogsReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store