import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import Blog from '../components/Blog'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id

    const token = useSelector(state => state.session.token)

    const like = async (blog) => {
        dispatch(likeBlog(blog, token))
    }

    const remove = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
            dispatch(deleteBlog(blog, token))
        }
    }

    if (id) {
        const blog = blogs.find(user => user.id === id)

        return (
            <Blog blog={blog} like={like} remove={remove} key={blog.id}/>
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


export default Blogs