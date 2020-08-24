import blogService from '../services/blogs'
import {info, error} from './notification'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'NEW_BLOG': {
        return state.concat(action.data)
    }
    case 'DELETE_BLOG': {
        const deletedBlog = action.data

        return state.filter(anecdote => anecdote.id != deletedBlog.id)
    }
    case 'UPDATE_BLOG': {
        const newBlog = action.data
        const id = newBlog.id

        return state.map(blog =>
            blog.id !== id ? blog : newBlog
        )
    }
    case 'GET_BLOGS': {
        const user = action.data
        return state.map(blog =>
            blog.id == user ? blog : null
        )
    }
    case 'INIT_BLOGS': {
        return action.data
    }
    default: return state
    }
}

export const createBlog = (blog, token) => {
    return async dispatch => {
        try {
            const res = await blogService.create(blog, token)

            dispatch({
                type: 'NEW_BLOG',
                data: res
            })

            dispatch(info('Blog successfully created', 5))
        } catch (err) {
            dispatch(error('Error creating blog', 5))
        }
    }
}

export const likeBlog = (blog, token) => {
    return async dispatch => {
        const newBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        try {
            const res = await blogService.update(newBlog.id, newBlog, token)

            dispatch({
                type: 'UPDATE_BLOG',
                data: res
            })

            dispatch(info('Blog successfully liked', 5))
        } catch (err) {
            dispatch(error('Error liking blog', 5))
        }


    }
}

export const deleteBlog = (blog, token) => {
    return async dispatch => {
        try {
            await blogService.remove(blog.id, token)

            dispatch({
                type: 'DELETE_BLOG',
                data: blog
            })

            dispatch(info('Blog successfully deleted', 5))
        } catch (err) {
            dispatch(error('Error deleting blog', 5))
        }
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const res = await blogService.getAll()

        dispatch({
            type: 'INIT_BLOGS',
            data: res
        })
    }
}

export default blogReducer