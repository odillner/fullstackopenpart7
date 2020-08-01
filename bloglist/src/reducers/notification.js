const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'DISPLAY_INFO': {
        const newState = {
            type: 'info',
            message: action.data.message,
            timeout: action.data.timeout
        }
        return newState
    }
    case 'DISPLAY_ERROR': {
        const newState = {
            type: 'error',
            message: action.data.message,
            timeout: action.data.timeout
        }
        return newState
    }
    case 'RESET_NOTIFICATION': {
        if (state) {
            clearTimeout(state.timeout)
        }
        return null
    }
    default: return state
    }
}

export const info = (message, duration) => {
    return async dispatch => {
        dispatch({
            type: 'RESET_NOTIFICATION',
        })

        const timeout = setTimeout(() => {
            dispatch({
                type: 'RESET_NOTIFICATION',
            })
        }, duration*1000)

        dispatch({
            type: 'DISPLAY_INFO',
            data: {message, timeout}
        })
    }
}

export const error = (message, duration) => {
    return async dispatch => {
        dispatch({
            type: 'RESET_NOTIFICATION',
        })

        const timeout = setTimeout(() => {
            dispatch({
                type: 'RESET_NOTIFICATION',
            })
        }, duration*1000)

        dispatch({
            type: 'DISPLAY_ERROR',
            data: {message, timeout}
        })
    }
}

export const clear = () => {
    return {
        type: 'RESET_NOTIFICATION',
    }
}

export default notificationReducer