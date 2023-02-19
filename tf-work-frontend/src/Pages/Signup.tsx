import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import IMAGE from '../Images/img5.jpg';
import { performCreateUser } from '../Scripts/AllApi.ts';
import { User } from '../Scripts/Classlist.ts';
import { routes } from '../Scripts/Data.ts';
import '../Styles/Signup.css';

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
        <div className="container">
            <div className="cont2">
                <Typography
                    onClick={() => {
                        window.location.href = routes.SignIn;
                    }}
                    className="back-login"
                >
                    {'<- Back to Sign In'}
                </Typography>
                <Typography color="primary" className="cr-a">
                    Create Account
                </Typography>
                <TextField
                    value={name}
                    variant="filled"
                    className="space"
                    onChange={({ target: view }) => {
                        setName(view.value);
                    }}
                    label="Full name"
                />
                <TextField
                    value={email}
                    variant="filled"
                    onChange={({ target: view }) => {
                        setEmail(view.value);
                    }}
                    label="Email Address"
                    className="space"
                />
                <TextField
                    value={address}
                    className="space"
                    variant="filled"
                    onChange={({ target: view }) => {
                        setAddress(view.value);
                    }}
                    label="Address"
                />
                <TextField
                    value={password}
                    variant="filled"
                    className="space"
                    onChange={({ target: view }) => {
                        setPassword(view.value);
                        setPassError(view.value !== confirm);
                    }}
                    label="Password"
                />
                <TextField
                    variant="filled"
                    className="space"
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
                    className="space"
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
                                new User([], name, password, email, address, usertype, '', '', '')
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
            </div>
            <img className="sign-up-image" alt="" src={IMAGE} />
        </div>
    );
}
