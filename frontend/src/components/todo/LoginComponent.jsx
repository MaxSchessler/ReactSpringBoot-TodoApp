import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../styles/TodoApp.css";
import {authorizationContext, useAuth} from "./security/AuthorizationContext";

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const authContext = useAuth();

    const onButtonClick = () => {
        if (authContext.login(username, password)) {
            navigate("/welcome");
        } else {
            setError('Invalid username or password')
            setError('Invalid username or password')
        }
    }

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br/>
            <label className={'errorLabel'}>{error}</label>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={username}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={password}
                    type={"password"}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
    )
}

export default Login