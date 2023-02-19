import { Add } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    AppBar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Icon,
    LinearProgress,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { getMyProject, postWork } from '../Scripts/AllApi.ts';
import { appName, routes } from '../Scripts/Data.ts';
import '../Styles/ClientHome.css';

async function getProjects(clientID: string, update) {
    const x = await getMyProject(clientID);
    update(x);
}

function openDetails(id) {
    window.location.href = `${routes.DetailsPage}?id=${id}`;
}

export default function ClientHome() {
    const [data, setData] = useState();
    const [newp, newPage] = useState(false);
    const [optionsOpen, setoptionsOpen] = useState(false);
    const [anch, setanc] = useState(null);
    const id = new URLSearchParams(document.location.search).get('id');
    if (!id) {
        document.location.href = '/nothing';
        return <div />;
    }
    if (!data) {
        getProjects(id, setData);
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
                    <Dialog
                        fullWidth
                        open={newp}
                        onClose={() => {
                            newPage(false);
                        }}
                    >
                        <DialogTitle>
                            <Typography>New Project</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Stack spacing={2}>
                                <TextField label="Title" id="title" fullWidth />
                                <TextField label="Details" id="details" fullWidth />
                                <TextField label="Price" id="price" fullWidth />
                                <TextField
                                    label="Skills"
                                    id="skills"
                                    placeholder="Comma separated skills"
                                    fullWidth
                                />
                            </Stack>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    const title = document.getElementById('title').value;
                                    const details = document.getElementById('details').value;
                                    const price = document.getElementById('price').value;
                                    const skills = document.getElementById('skills').value;
                                    (async () => {
                                        const f = await postWork({
                                            title,
                                            details,
                                            price,
                                            from: localStorage.getItem('token'),
                                            skills,
                                        });
                                        if (f.status === 'OK') {
                                            newPage(false);
                                            window.location.reload();
                                        }
                                    })();
                                }}
                            >
                                Create
                            </Button>
                        </DialogContent>
                    </Dialog>

                    <Button
                        onClick={(e) => {
                            setanc(e.currentTarget);
                            setoptionsOpen(true);
                        }}
                        variant="contained"
                        color="black"
                        sx={{ color: '#ffffff' }}
                    >
                        Options
                    </Button>
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
                                window.location.href = `${routes.Profile}?id=${localStorage.getItem(
                                    'token'
                                )}`;
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem>Cash In & Withdraw</MenuItem>
                        <MenuItem
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('usertype');
                                window.location.href = routes.Root;
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
                        MY PROJECTS
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
                    startIcon={<Add />}
                    onClick={() => {
                        newPage(true);
                    }}
                >
                    Create
                </Button>
            </div>
        </div>
    );
}
