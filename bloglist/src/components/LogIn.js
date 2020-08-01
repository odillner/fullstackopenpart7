import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

import {logInUser} from '../reducers/session'

const LogIn = () => {
    const [nameInput, setNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const dispatch = useDispatch()

    const logIn = async (event) => {
        event.preventDefault()

        const username = nameInput
        const password = passwordInput

        dispatch(logInUser(username, password))

        setNameInput('')
        setPasswordInput('')
    }

    const handleNameForm = (event) => {
        setNameInput(event.target.value)
    }

    const handlePasswordForm = (event) => {
        setPasswordInput(event.target.value)
    }

    return (
        <div className="logInForm">
            <form>
                <div>
                    name:
                    <input
                        id="username-input"
                        value={nameInput}
                        onChange={handleNameForm}
                    />
                </div>
                <div>
                    password:
                    <input
                        id="password-input"
                        value={passwordInput}
                        onChange={handlePasswordForm}
                    />
                </div>
                <div>
                    <button id="login-button" type="submit" onClick={logIn}>
                        Log In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LogIn
