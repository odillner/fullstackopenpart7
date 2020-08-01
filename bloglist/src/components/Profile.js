import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {endSession} from '../reducers/session'

import Blogs from './Blogs'
import Togglable from './Togglable'

const Profile = () => {
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(endSession())
    }
    if (user) {
        return (
            <div className='profile'>
                <button id="logout-button" onClick={logOut}>
                    Log Out
                </button>
                <h1>profile</h1>
                <p>username: {user.username} </p>
                <p>id: {user.id} </p>
                <div>
                    <Togglable show="Show blogs" hide="Hide blogs">
                        <Blogs/>
                    </Togglable>
                </div>
            </div>
        )
    }

    return (
        <div/>
    )
}


export default Profile