import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import Toggleble from './Togglable'

import {deleteBlog, likeBlog, addComment} from '../reducers/blogs'


export const Blog = ({blog}) => {
    const [commentInput, setCommentInput] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    const token = useSelector(state => state.session.token)

    const like = async () => {
        dispatch(likeBlog(blog, token))
    }

    const remove = async () => {
        if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
            dispatch(deleteBlog(blog, token))
            history.push('/blogs')
        }
    }

    const comment = async () => {
        dispatch(addComment(blog, commentInput))
        setCommentInput('')
    }

    const handleCommentForm = (event) => {
        setCommentInput(event.target.value)
    }


    if (!blog) {
        return (
            <div/>
        )
    }
    return (
        <div className="blog">
            <p>title: {blog.title}</p>
            <p>author: {blog.author} </p>
            <p>url: {blog.url} </p>
            <p className="likes">likes: {blog.likes}
                <button id="like-button" onClick={like}>
                Like
                </button>
            </p>
            <p>owner id: {blog.user} </p>
            <p>blog id: {blog.id} </p>
            <div>comments:
                {blog.comments.map(comment => {
                    return (<p key={comment}>{comment}</p>)
                })}
            </div>

            <div>
                <input
                    id="comment-input"
                    value={commentInput}
                    onChange={handleCommentForm}
                />
            </div>
            <div>
                <button
                    id="add-comment-button"
                    type="submit"
                    onClick={comment}
                >
                    Add comment
                </button>
            </div>
            <button id="remove-button" onClick={remove}>
                Remove
            </button>
        </div>
    )
}

export const BlogList = ({blogs}) => {
    if (blogs) {
        if (blogs[0]) {
            return (
                blogs.map(blog => {
                    return (
                        <li key={blog.id}>
                            *
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </li>
                    )
                })
            )
        }
    }
    return (
        <div/>
    )
}

export default BlogList