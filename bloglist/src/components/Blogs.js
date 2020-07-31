import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

import blogService from '../services/blogs'


const Blogs = (props) => {
    const {user, setUser} = props.state
    const {info, error} = props.display

    const blogs = user.blogs.sort((a,b) => b.likes - a.likes)

    const likeBlog = async (blog) => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            user: blog.user,
            likes: blog.likes + 1
        }

        try {
            await blogService.update(blog.id, newBlog, user.token)

            blog.likes++

            user.blogs = blogs
            setUser(user)

            info('Blog successfully liked')
        } catch (err) {
            error('Error liking blog')
        }
    }

    const removeBlog = async (removedBlog) => {
        if (!window.confirm(`Do you really want to delete ${removedBlog.title}?`)) {
            return
        }

        try {
            await blogService.remove(removedBlog.id, user.token)

            user.blogs = user.blogs.filter(blog => blog.id != removedBlog.id)
            setUser(user)

            info('Blog successfully deleted')
        } catch (err) {
            console.log(err)
            error('Error deleting blog')
        }
    }

    if (blogs[0]) {
        return (
            <div className="wrapper" id="blog-list">
                {blogs.map(blog => {
                    return (
                        <Blog blog={blog} like={likeBlog} remove={removeBlog} key={blog.id}/>
                    )
                })}
            </div>
        )
    }

    return (
        <div/>
    )
}

Blogs.propTypes = {
    state: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
}

export default Blogs