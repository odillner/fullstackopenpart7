import React from 'react'

import {useField} from '../hooks/'


const CreateAnecdote = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.input.value,
            author: author.input.value,
            info: info.input.value,
            votes: 0
        })
    }

    const clearFields = () => {
        content.clear()
        author.clear()
        info.clear()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
          content
                    <input {...content.input} />
                </div>
                <div>
          author
                    <input {...author.input} />
                </div>
                <div>
          url for more info
                    <input {...info.input} />
                </div>
                <button>create</button>
            </form>
            <button onClick={clearFields}>clear</button>
        </div>
    )

}

export default CreateAnecdote