import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components"


export default function Login() {

    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');

    const { isLoggedIn, userRole, username, login, logout } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        login(usernameInput, password)
    }

    return (
        <Div_Container>
            {!isLoggedIn && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Username:
                            <input
                                type="username"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Sumbmit</button>
                </form>
            )}

            {isLoggedIn && (
                <div className="login-confirmed">
                    <div>Welcome back {username}</div>
                    <div>Your current status is: {userRole}</div>
                    <br />
                    <button onClick={logout}>Exit</button>
                </div>
            )}

        </Div_Container>
    )
}

const Div_Container = styled.div`
    width: 100vw; 
`;