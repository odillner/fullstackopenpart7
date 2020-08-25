import React, {useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {createBlog} from '../reducers/blogs'


import Toggleble from '../components/Togglable'

const NewBlog = () => {
    const [titleInput, setTitleInput] = useState('')
    const [authorInput, setAuthorInput] = useState('')
    const [urlInput, setUrlInput] = useState('')


    const history = useHistory()
    const dispatch = useDispatch()

    const session = useSelector(state => state.session)

    const toggleRef = useRef()

    const create = async (event) => {
        event.preventDefault()

        const newBlog = {
            title: titleInput,
            author: authorInput,
            url: urlInput,
            user: session.user.id,
        }

        dispatch(createBlog(newBlog, session.token))
        history.push('/blogs')


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
                            onClick={create}
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </Toggleble>
        </div>
    )

}

export default NewBlog
