import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notification'
import sessionReducer from './reducers/session'
import blogsReducer from './reducers/blogs'

const reducer = combineReducers({
    notification: notificationReducer,
    session: sessionReducer,
    blogs: blogsReducer

})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store