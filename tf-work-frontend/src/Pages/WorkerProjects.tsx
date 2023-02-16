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
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import { appName, routes } from '../Scripts/Data.ts';

export default function WorkerHome() {
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
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        $1200
                    </Typography>
                    <Button
                        onClick={() => {
                            window.location.href = routes.WorkerHome;
                        }}
                        color="inherit"
                    >
                        All projects
                    </Button>
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
                <Stack>
                    <Typography variant="h4">My Projects</Typography>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid item xs={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Project title</Typography>
                                    <Typography variant="h6">$32</Typography>
                                    <Typography>I want an android app to...</Typography>
                                </CardContent>
                                <CardActionArea>
                                    <CardActions>
                                        <Button>Open details</Button>
                                    </CardActions>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </div>
    );
}
