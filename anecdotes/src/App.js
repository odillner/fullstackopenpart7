import React, {useState} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'

import Menu from './components/Menu'
import Footer from './components/Footer'
import Notification from './components/Notification'

import About from './pages/About'
import CreateAnecdote from './pages/CreateAnecdote'
import Anecdotes from './pages/Anecdotes'
import Anecdote from './pages/Anecdote'

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const history = useHistory()

    const [notification, setNotification] = useState(null)

    const info = (info) => {
        setNotification({text: info, type: 'info'})
        setTimeout(() => {setNotification(null)}, 10000)
    }
    const error = (error) => {
        setNotification({text: error, type: 'error'})
        setTimeout(() => {setNotification(null)}, 10000)
    }

    const addNew = (anecdote) => {
        info(`new anecdote ${anecdote.content} added`)
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
        history.push('/')
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification message={notification}/>
            <Switch>
                <Route path="/createanecdote">
                    <CreateAnecdote addNew={addNew} />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/anecdotes/:id">
                    <Anecdote anecdotes={anecdotes} />
                </Route>
                <Route path="/">
                    <Anecdotes anecdotes={anecdotes} />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App
