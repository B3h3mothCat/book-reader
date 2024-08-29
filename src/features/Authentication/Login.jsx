import { useState } from "react";
import { useAuth } from "./AuthContext";
import styled from "styled-components"
import RegistrationForm from "../../components/ui/RegistrationForm"
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [isNewAccount, setItNewAccount] = useState(false)
    const { isLoggedIn, userRole, username, login, logout } = useAuth();
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        login(usernameInput, password)
        navigate('/account')
    }

    return (
        <Div_Container>
            {!isNewAccount && !isLoggedIn && (
                <>
                    <form
                        onSubmit={handleSubmit}
                    >
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
                    </form>
                    <div className="btn-group">
                        <button onClick={handleSubmit}>Sumbmit</button>
                        <button onClick={() => setItNewAccount(true)}>Create account</button>
                    </div>

                </>

            )}

            {isNewAccount && (
                <>
                    <RegistrationForm onCancel={() => setItNewAccount(false)} />
                    <div className="btn-group">
                        <button onClick={() => setItNewAccount(false)}>Return</button>
                    </div>
                </>
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
    padding-top: calc(var(--navbar-height) + 15px);
    width: 100vw; 
`;