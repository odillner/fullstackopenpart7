import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Toggleble from './Togglable'

import {deleteBlog, likeBlog} from '../reducers/blogs'

export const Blog = (props) => {
    const blog = props.blog

    return (
        <div className="blog">
            <p>title: {blog.title}</p>
            <p>author: {blog.author} </p>
            <Toggleble show="view" hide="hide">
                <p>url: {blog.url} </p>
                <p className="likes">likes: {blog.likes}
                    <button id="like-button" onClick={() => props.like(blog)}>
                    Like
                    </button>
                </p>
                <p>owner id: {blog.user} </p>
                <p>blog id: {blog.id} </p>
                <button id="remove-button" onClick={() => props.remove(blog)}>
                    Remove
                </button>
            </Toggleble>
        </div>
    )
}

export const BlogList = ({blogs}) => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.session.token)

    const like = async (blog) => {
        dispatch(likeBlog(blog, token))
    }

    const remove = async (blog) => {
        if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
            dispatch(deleteBlog(blog, token))
        }
    }

    if (blogs) {
        if (blogs[0]) {
            return (
                <div className="wrapper" id="blog-list">
                    {blogs.map(blog => {
                        return (
                            <Blog blog={blog} like={like} remove={remove} key={blog.id}/>
                        )
                    })}
                </div>
            )
        }
    }
    return (
        <div/>
    )
}

export default BlogList