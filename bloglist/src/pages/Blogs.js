import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {Blog, BlogList} from '../components/Blog'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id

    if (id) {
        const blog = blogs.find(blog => blog.id === id)

        return (
            <Blog blog={blog}/>
        )
    } else {
        return (
            <div>
                <h1>Blogs</h1>
                <BlogList blogs={blogs}/>
            </div>
        )
    }
}


export default Blogs