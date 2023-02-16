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
    TextField,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { getAllProject } from '../Scripts/AllApi.ts';
import { appName, routes } from '../Scripts/Data.ts';
import { toolbarSearchBoxTheme } from '../Scripts/Theme.ts';

function openDetails(id) {
    window.location.href = `${routes.DetailsPage}?id=${id}`;
}

async function getProjects(update) {
    const x = await getAllProject();
    update(x);
}

export default function WorkerHome() {
    const [data, setData] = useState();
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
                    <ThemeProvider theme={toolbarSearchBoxTheme}>
                        <TextField variant="standard" label="Search" />
                    </ThemeProvider>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        $1200
                    </Typography>
                    <Button
                        onClick={() => {
                            window.location.href = routes.WorkerProject;
                        }}
                        color="inherit"
                    >
                        My projects
                    </Button>
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
                    <Typography variant="h4">All Projects</Typography>
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
