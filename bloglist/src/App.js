import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import Notification from './components/Notification'
import Header from './components/Header'
import Navbar from './components/Navbar'

import NewBlog from './components/NewBlog'

import LogIn from './pages/LogIn'
import Users from './pages/Users'
import Blogs from './pages/Blogs'

import {initSession} from './reducers/session'


function App() {
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    useEffect(() => {
        dispatch(initSession())
    }, [])

    return (
        <div>
            <Header/>
            <Navbar/>
            <Notification/>
            <Switch>
                <Route path="/login">
                    {session ? <Redirect to="/"/> : <LogIn/>}
                </Route>
                <Route path="/users/:id">
                    {session ? <Users /> : <Redirect to="/login" />}
                </Route>
                <Route path="/blogs">
                    {session ? <Blogs /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    {session ? <Users /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </div>
    )
    /*
    if (!session) {
        return (
            <div>
                <h1>Bloglist</h1>
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
    */
}

export default App
