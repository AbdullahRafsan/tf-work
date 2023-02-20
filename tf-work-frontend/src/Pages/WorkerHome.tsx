/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    AppBar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Icon,
    LinearProgress,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { getAllProject } from '../Scripts/AllApi.ts';
import { appName, routes } from '../Scripts/Data.ts';

function openDetails(id) {
    window.location.href = `${routes.DetailsPage}?id=${id}`;
}

async function getProjects(update) {
    const x = await getAllProject();
    update(x);
}

export default function WorkerHome() {
    const [data, setData] = useState();
    const [optionsOpen, setoptionsOpen] = useState(false);
    const [anch, setanc] = useState(null);
    const id = new URLSearchParams(document.location.search).get('id');
    if (!id) {
        document.location.href = '/';
        return <div />;
    }
    if (!data) {
        getProjects(setData);
        return <LinearProgress color="primary" />;
    }

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Icon sx={{ mr: 2 }}>
                        <AcUnitIcon />
                    </Icon>
                    <Typography variant="h6" sx={{ fontFamilly: 'Roboto', flexGrow: 1 }}>
                        {appName}
                    </Typography>

                    <Button
                        onClick={() => {
                            window.location.href = routes.WorkerProject;
                        }}
                        color="inherit"
                    >
                        My projects
                    </Button>
                    <img
                        src={JSON.parse(localStorage.getItem('token')).pic}
                        style={{
                            objectFit: 'cover',
                            width: '40px',
                            height: '40px',
                            borderRadius: '25px',
                            cursor: 'pointer',
                        }}
                        alt=""
                        onClick={(e) => {
                            setanc(e.currentTarget);
                            setoptionsOpen(true);
                        }}
                    />
                    <Menu
                        anchorEl={anch}
                        onClose={() => {
                            setanc(null);
                            setoptionsOpen(false);
                        }}
                        open={optionsOpen}
                    >
                        <MenuItem>Balance: $2200</MenuItem>
                        <MenuItem
                            onClick={() => {
                                window.location.href = `${routes.Profile}?id=${
                                    JSON.parse(localStorage.getItem('token')).email
                                }`;
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem>Cash In & Withdraw</MenuItem>
                        <MenuItem
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('usertype');
                                window.location.href = routes.SignIn;
                            }}
                            sx={{ color: '#FF0000' }}
                        >
                            Log Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div>
                <Stack>
                    <Typography variant="h4" sx={{ textAlign: 'center', mt: 7, fontWeight: 600 }}>
                        ALL PROJECTS
                    </Typography>
                    <Grid container spacing={6} sx={{ mt: 7, p: 3 }}>
                        {data.map((item) => (
                            <Grid item sm={2}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => {
                                            openDetails(item.ID);
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h5">{item.title}</Typography>
                                            <Typography variant="h6">{item.price}</Typography>
                                            <Typography>{item.details}</Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    <CardActions>
                                        <Button
                                            onClick={() => {
                                                openDetails(item.ID);
                                            }}
                                        >
                                            Open details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </div>
            <div className="fab-cont">
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                        mr: 2,
                        textTransform: 'none',
                        borderRadius: 5,
                        fontWeight: 400,
                        fontSize: 18,
                    }}
                >
                    Watch Video
                </Button>
            </div>
        </div>
    );
}
