import loginService from '../services/login'
import userService from '../services/users'

import {info, error} from './notification'
import {initBlogs} from './blogs'
import {initUsers} from './users'

const sessionReducer = (state = null, action) => {
    switch (action.type) {
    case 'INIT': {
        return action.data
    }
    case 'END': {
        return null
    }
    default: return state
    }
}

export const logInUser = (username, password) => {
    return async dispatch => {
        const user = {username, password}

        try {
            const res = await loginService.auth(user)

            window.localStorage.setItem('id', res.user.id)
            window.localStorage.setItem('token', res.token)

            dispatch({
                type: 'INIT',
                data: res
            })

            dispatch(initBlogs())
            dispatch(initUsers())

            dispatch(info('Successfully logged in', 5))
        } catch (err) {
            dispatch(error('Failed to log in, password or username incorrect', 5))
        }
    }
}

export const initSession = () => {
    return async dispatch => {
        const id = window.localStorage.getItem('id')
        const token = window.localStorage.getItem('token')

        if (id && token) {
            const user = await userService.getById(id)

            dispatch({
                type: 'INIT',
                data: {
                    user,
                    token
                }
            })

            dispatch(initBlogs())
            dispatch(initUsers())
        }
    }
}


export const endSession = () => {
    return async dispatch => {
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('token')

        dispatch(info('Successfully logged out', 5))

        dispatch({
            type: 'END'
        })
    }
}

export default sessionReducer