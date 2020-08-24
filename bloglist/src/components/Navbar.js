import React from 'react'
import {Link} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

import {endSession} from '../reducers/session'

const Navbar = () => {
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    const logOut = () => {
        dispatch(endSession())
    }

    return(
        <div className="navbar">
            {session
                ?
                <>
                    <Link to="/">Home</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/" className="right" onClick={logOut}>Log Out</Link>
                </>
                :
                <Link to="/login" className="right">Log In</Link>
            }
        </div>
    )
}

export default Navbar
