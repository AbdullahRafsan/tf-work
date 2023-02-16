import { Button, Container, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { performCreateUser } from '../Scripts/AllApi.ts';
import { User } from '../Scripts/Classlist.ts';
import { appName, routes } from '../Scripts/Data.ts';

export default function Signup() {
    const d: unknown = '';
    const [usertype, setUsertype] = useState('client');
    const [name, setName] = useState(d);
    const [email, setEmail] = useState(d);
    const [address, setAddress] = useState(d);
    const [password, setPassword] = useState(d);
    const [confirm, setConfirm] = useState(d);
    const [passerror, setPassError] = useState(false);
    return (
        <div>
            <Container>
                <Stack spacing={2}>
                    <Typography textAlign="center" sx={{ fontFamily: 'Roboto', fontSize: '22px' }}>
                        Create an account to {appName}
                    </Typography>
                    <TextField
                        value={name}
                        onChange={({ target: view }) => {
                            setName(view.value);
                        }}
                        label="Full name"
                    />
                    <TextField
                        value={email}
                        onChange={({ target: view }) => {
                            setEmail(view.value);
                        }}
                        label="Email Address"
                    />
                    <TextField
                        value={address}
                        onChange={({ target: view }) => {
                            setAddress(view.value);
                        }}
                        label="Address"
                    />
                    <TextField
                        value={password}
                        onChange={({ target: view }) => {
                            setPassword(view.value);
                            setPassError(view.value !== confirm);
                        }}
                        label="Password"
                    />
                    <TextField
                        onChange={({ target: view }) => {
                            setConfirm(view.value);
                            setPassError(view.value !== password);
                        }}
                        error={passerror}
                        helperText={passerror ? 'Password does not match !' : ''}
                        label="Confirm Password"
                    />
                    <Select
                        value={usertype}
                        onChange={({ target: view }) => {
                            setUsertype(view.value);
                        }}
                    >
                        <MenuItem value="client">Client</MenuItem>
                        <MenuItem value="worker">Worker</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (!email) {
                                setEmail(undefined);
                                return;
                            }
                            if (!password) {
                                setPassword(undefined);
                                return;
                            }
                            if (!confirm) {
                                setConfirm(undefined);
                                return;
                            }
                            if (!name) {
                                setName(undefined);
                                return;
                            }
                            if (!address) {
                                setAddress(undefined);
                                return;
                            }
                            (async () => {
                                const x = await performCreateUser(
                                    new User(
                                        [],
                                        name,
                                        password,
                                        email,
                                        address,
                                        usertype,
                                        '',
                                        '',
                                        ''
                                    )
                                );
                                if (x === 200) {
                                    alert('Account creation successful');
                                    window.location.href = routes.SignIn;
                                }
                            })();
                        }}
                        sx={{ textTransform: 'none' }}
                    >
                        Create Account
                    </Button>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Typography variant="h6">Have an account ?</Typography>
                        <Typography
                            onClick={() => {
                                window.location.href = routes.SignIn;
                            }}
                            variant="h6"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                        >
                            Log in
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
