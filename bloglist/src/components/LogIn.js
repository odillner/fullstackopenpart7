import React, {useState} from 'react'
import PropTypes from 'prop-types'

import logInService from '../services/login'

const LogIn = (props) => {
    const [nameInput, setNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const {info, error} = props.display

    const logIn = async (event) => {
        event.preventDefault()

        const newUser = {
            username: nameInput,
            password: passwordInput
        }

        try {
            const res = await logInService.auth(newUser)

            props.setSession(res.user.id, res.token)
            info('Successfully logged in')
        } catch (err) {
            error('Failed to log in, password or username incorrect')
        }
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

LogIn.propTypes = {
    setSession: PropTypes.func.isRequired,
    display: PropTypes.object.isRequired,
}

export default LogIn
