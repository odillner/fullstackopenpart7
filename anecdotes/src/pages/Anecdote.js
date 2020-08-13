import React from 'react'
import {useParams} from 'react-router-dom'

const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)

    if (!anecdote) {
        return (
            <p>no anecdote with given id exists</p>
        )
    } else {
        return (
            <div>
                <p>content: {anecdote.content}</p>
                <p>author: {anecdote.author}</p>
                <p>likes: {anecdote.likes}</p>
                <p>info: {anecdote.info}</p>
            </div>
        )
    }

}

export default Anecdote