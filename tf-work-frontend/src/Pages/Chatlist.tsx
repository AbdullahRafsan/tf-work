import AcUnitIcon from '@mui/icons-material/AcUnit';
import { AppBar, Button, Card, Container, Icon, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import profile from '../Images/img2.jpg';
import { getChatList } from '../Scripts/AllApi.ts';
import { routes } from '../Scripts/Data.ts';

async function getMsgList(update) {
    update(getChatList());
}

export default function NoUserHome() {
    const [data, setData] = useState();
    if (!data) {
        getMsgList(setData);
        return <div />;
    }
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Icon sx={{ mr: 2 }}>
                        <AcUnitIcon />
                    </Icon>
                    <Typography variant="h6" sx={{ fontFamilly: 'Roboto', flexGrow: 1 }}>
                        24 Work
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
                {data.map((item) => (
                    <Card
                        onClick={() => {
                            window.location.href = routes.Inbox;
                        }}
                        sx={{ mt: 2, alignItems: 'center', display: 'flex', flexDirection: 'row' }}
                    >
                        <img
                            alt="profile"
                            style={{
                                border: '2px solid white',
                                borderRadius: '50%',
                                width: '100px',
                                objectFit: 'cover',
                                height: '100px',
                            }}
                            src={profile}
                        />
                        <Typography sx={{ ml: 2 }} variant="h5" textAlign="center">
                            {item.name}
                        </Typography>
                    </Card>
                ))}
            </Container>
        </div>
    );
}
