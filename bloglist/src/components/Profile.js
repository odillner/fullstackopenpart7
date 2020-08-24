import React from 'react'

import BlogList from './BlogList'
import Togglable from './Togglable'

const Profile = ({user}) => {
    if (user) {
        return (
            <div className='profile'>
                <h1>profile</h1>
                <p>username: {user.username} </p>
                <p>id: {user.id} </p>
                <div>
                    <Togglable show="Show blogs" hide="Hide blogs">
                        <BlogList blogs={user.blogs}/>
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