import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import Toggleble from './Togglable'

const NewBlog = (props) => {
    const [titleInput, setTitleInput] = useState('')
    const [authorInput, setAuthorInput] = useState('')
    const [urlInput, setUrlInput] = useState('')

    const toggleRef = useRef()

    const {user, setUser} = props.state
    const {info, error} = props.display

    const createBlog = async (event) => {
        event.preventDefault()

        const newBlog = {
            title: titleInput,
            author: authorInput,
            url: urlInput,
            user: user.id,
        }

        try {
            const res = await blogService.create(newBlog, user.token)

            user.blogs = user.blogs.concat(res)
            setUser(user)

            info('Blog successfully created')
        } catch (err) {
            error('Error creating blog')
        }

        setTitleInput('')
        setAuthorInput('')
        setUrlInput('')

        toggleRef.current.toggleVisibility()
    }

    const handleTitleForm = (event) => {
        setTitleInput(event.target.value)
    }

    const handleAuthorForm = (event) => {
        setAuthorInput(event.target.value)
    }

    const handleUrlForm = (event) => {
        setUrlInput(event.target.value)
    }

    if (user) {
        return (
            <div className="wrapper">
                <Toggleble show="Create new blog" hide="Cancel" ref={toggleRef}>
                    <form>
                        <div>
                            title:
                            <input
                                id="title-input"
                                value={titleInput}
                                onChange={handleTitleForm}
                            />
                        </div>
                        <div>
                            author:
                            <input
                                id="author-input"
                                value={authorInput}
                                onChange={handleAuthorForm}
                            />
                        </div>
                        <div>
                            url:
                            <input
                                id="url-input"
                                value={urlInput}
                                onChange={handleUrlForm}
                            />
                        </div>
                        <div>
                            <button
                                id="new-blog-button"
                                type="submit"
                                onClick={createBlog}
                            >
                                Create Blog
                            </button>
                        </div>
                    </form>
                </Toggleble>
            </div>
        )
    }

    return (
        <div>
            log in to create blog
        </div>
    )
}

NewBlog.propTypes = {
    state: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
}

export default NewBlog
