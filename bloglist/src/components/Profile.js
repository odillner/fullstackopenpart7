import React from 'react'
import PropTypes from 'prop-types'

import Blogs from './Blogs'
import Togglable from './Togglable'

const Profile = (props) => {
    const user = props.state.user

    if (user) {
        return (
            <div className='profile'>
                <button id="logout-button" onClick={props.endSession}>
                    Log Out
                </button>
                <h1>profile</h1>
                <p>username: {user.username} </p>
                <p>id: {user.id} </p>
                <div>
                    <Togglable show="Show blogs" hide="Hide blogs">
                        <Blogs state={props.state} display={props.display}/>
                    </Togglable>
                </div>
            </div>
        )
    }

    return (
        <div/>
    )
}

Profile.propTypes = {
    state: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
}

export default Profile