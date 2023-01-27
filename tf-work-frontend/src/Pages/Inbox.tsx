import { Send } from '@mui/icons-material';
import {
    AppBar,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import profile from '../Images/img2.jpg';
import { getMessage, sendMessage } from '../Scripts/AllApi.ts';
import { routes } from '../Scripts/Data.ts';

async function getMsg(update) {
    update(await getMessage());
}

export default function NoUserHome() {
    const [msg, setMsg] = useState();
    const [chat, setChat] = useState();
    if (!chat) {
        getMsg(setChat);
        return <div />;
    }
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <img
                        alt="profile"
                        style={{
                            border: '2px solid white',
                            borderRadius: '50%',
                            marginRight: 4,
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                        }}
                        src={profile}
                    />
                    <Typography variant="h6" sx={{ fontFamilly: 'Roboto', flexGrow: 1 }}>
                        Worker 1
                    </Typography>
                    <Button
                        onClick={() => {
                            window.location.href = routes.SignIn;
                        }}
                        color="inherit"
                    >
                        Sign out
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {chat.map((item) => (
                        <Stack direction="row">
                            <Typography
                                sx={{
                                    flexGrow:
                                        item.sender === localStorage.getItem('username') ? 0 : 1,
                                }}
                            />
                            <Paper
                                sx={{
                                    padding: 2,
                                    width: 'fit-content',
                                }}
                            >
                                <Typography>{item.msg}</Typography>
                                <Typography fontSize="11px">{item.sender}</Typography>
                            </Paper>
                        </Stack>
                    ))}
                </Stack>
            </Container>
            <Stack
                sx={{ width: '100%', position: 'absolute', top: 'auto', bottom: 5 }}
                direction="row"
            >
                <TextField
                    value={msg}
                    onChange={({ target: view }) => {
                        setMsg(view.value);
                    }}
                    fullWidth
                />
                <Button
                    sx={{ ml: 2 }}
                    endIcon={<Send />}
                    onClick={sendMessage(msg, localStorage.getItem('token'), '')}
                    variant="contained"
                >
                    Send
                </Button>
            </Stack>
        </div>
    );
}
