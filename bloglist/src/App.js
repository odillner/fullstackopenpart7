import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import LogIn from './components/LogIn'
import Notification from './components/Notification'
import Profile from './components/Profile'
import NewBlog from './components/NewBlog'

import {initSession} from './reducers/session'


function App() {
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    console.log(session)


    useEffect(() => {
        dispatch(initSession())
    }, [])

    /*
    const setSession = async (id, token) => {
        let user = await userService.getById(id)
        user.token = token


        setUser(user)
    }
    */

    if (!session) {
        return (
            <div>
                <h1>Bloglist</h1>
                <Notification/>
                <LogIn/>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Bloglist</h1>
                <Notification/>
                <Profile/>
                <NewBlog/>
            </div>
        )
    }
}

export default App
