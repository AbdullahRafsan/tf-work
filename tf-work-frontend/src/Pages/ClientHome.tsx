import { Add } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    AppBar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Container,
    Grid,
    Icon,
    LinearProgress,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { getMyProject } from '../Scripts/AllApi.ts';

import { routes } from '../Scripts/Data.ts';

async function getProjects(clientID: string, update) {
    const x = await getMyProject(clientID);
    update(x);
}

function openDetails(id) {
    window.location.href = `${routes.DetailsPage}?id=${id}`;
}

export default function ClientHome() {
    const [data, setData] = useState();
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
                        24 Work
                    </Typography>
                    <Button
                        color="inherit"
                        sx={{ mr: 2, textTransform: 'none' }}
                        startIcon={<Add />}
                    >
                        New Project
                    </Button>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        $2200
                    </Typography>
                    <Button
                        onClick={() => {
                            window.location.href = `${routes.Profile}?id=${localStorage.getItem(
                                'token'
                            )}`;
                        }}
                        color="inherit"
                    >
                        My ID
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                <Stack>
                    <Typography variant="h4">My Projects</Typography>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        {data.map((item) => (
                            <Grid item xs={3}>
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
            </Container>
        </div>
    );
}
