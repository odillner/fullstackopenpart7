import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Profile from '../components/Profile'

const Users = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id

    if (id) {
        const user = users.find(user => user.id === id)

        return (
            <Profile user={user}/>
        )
    } else {
        return (
            <div>
                <h1>Users</h1>
                {users.map(user => {
                    return (
                        <li key={user.id}>
                            *
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </li>
                    )
                })}
            </div>
        )
    }
}


export default Users