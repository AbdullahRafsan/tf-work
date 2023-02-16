import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import LoginBack from '../Images/img5.jpg';
import { performAuth } from '../Scripts/AllApi.ts';
import { appName, routes } from '../Scripts/Data.ts';

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
        <div
            style={{
                display: 'flex',
                direction: 'row',
                width: '100%',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                alt="loginBack"
                src={LoginBack}
                style={{
                    height: '100%',
                    margin: '10rem',
                }}
            />
            <Container>
                <Stack spacing={2}>
                    <Typography
                        sx={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: '24px' }}
                    >
                        Sign in to {appName}
                    </Typography>
                    <TextField
                        value={email}
                        error={email === undefined}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        value={pass}
                        error={pass === undefined}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
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
                        Continue
                    </Button>
                    <Stack justifyContent="center" spacing={2} direction="row">
                        <Typography variant="h6">Don't have an account ?</Typography>
                        <Typography
                            color="primary"
                            variant="h6"
                            onClick={() => {
                                window.location.href = routes.CreateAccount;
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            Create one.
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
