import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import LoginBack from '../Images/img5.jpg';
import { performAuth } from '../Scripts/AllApi.ts';
import { routes } from '../Scripts/Data.ts';
import '../Styles/Login.css';

async function performLogin(user: string, pass: string) {
    const d = await performAuth(user, pass);
    if (d.status !== 'OK') {
        alert(d.status);
    } else {
        localStorage.setItem('usertype', d.usertype);
        localStorage.setItem('token', d.token);
        document.location.href = '/';
    }
}

export default function Main() {
    const d: unknown = '';
    const [email, setEmail] = useState(d);
    const [pass, setPassword] = useState(d);
    return (
        <div className="container">
            <img alt="loginBack" src={LoginBack} className="image-section" />
            <div className="login-section">
                <Typography className="back-text">{'<- Go to home'}</Typography>
                <Typography color="primary" className="sign-in">
                    Sign In
                </Typography>
                <div className="container-signin">
                    <TextField
                        variant="filled"
                        label="Email Address"
                        value={email}
                        fullWidth
                        error={email === undefined}
                        sx={{
                            mb: 2,
                        }}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        variant="filled"
                        label="Password"
                        fullWidth
                        value={pass}
                        error={pass === undefined}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <div className="container-signin-control">
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                            }}
                            onClick={() => {
                                if (!email && !pass) {
                                    setEmail(undefined);
                                    setPassword(undefined);
                                    return;
                                }
                                if (!email) {
                                    setEmail(undefined);
                                    return;
                                }
                                if (!pass) {
                                    setPassword(undefined);
                                    return;
                                }
                                performLogin(email, pass);
                            }}
                        >
                            Sign In
                        </Button>
                        <Typography
                            variant="h5"
                            sx={{
                                ml: 5,
                                mr: 5,
                            }}
                        >
                            Or
                        </Typography>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                window.location.href = routes.CreateAccount;
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            Create Account.
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
