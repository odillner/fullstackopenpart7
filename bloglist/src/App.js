import React, {useState, useEffect} from 'react'

import LogIn from './components/LogIn'
import Notification from './components/Notification'
import Profile from './components/Profile'


import userService from './services/users'
import NewBlog from './components/NewBlog'

function App() {
    const [notification, setNotification] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const id = window.localStorage.getItem('id')
        const token = window.localStorage.getItem('token')

        if (id && token) {
            setSession(id, token)
        }
    }, [])


    const info = (info) => {
        setNotification({text: info, type: 'info'})
        setTimeout(() => {setNotification(null)}, 5000)
    }

    const error = (error) => {
        setNotification({text: error, type: 'error'})
        setTimeout(() => {setNotification(null)}, 5000)
    }

    const display = {info, error}
    const state = {user, setUser}

    const setSession = async (id, token) => {
        let user = await userService.getById(id)
        user.token = token

        window.localStorage.setItem('id', id)
        window.localStorage.setItem('token', token)
        setUser(user)
    }

    const endSession = async () => {
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('token')

        setUser(null)
        info('Successfully logged out')
    }

    if (!user) {
        return (
            <div>
                <h1>Bloglist</h1>
                <Notification message={notification}/>
                <LogIn state={state} display={display} setSession={setSession}/>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Bloglist</h1>
                <Notification message={notification}/>
                <Profile state={state} display={display} endSession={endSession}/>
                <NewBlog state={state} display={display}/>
            </div>
        )
    }
}

export default App
