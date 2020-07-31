import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
    if (props.message === null) {
        return null
    }

    return (
        <div className={props.message.type}>
            {props.message.text}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.object,
}

export default Notification