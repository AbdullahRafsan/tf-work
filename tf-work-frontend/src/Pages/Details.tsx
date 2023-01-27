import { Close, Message } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    LinearProgress,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { bidProj, getDetails } from '../Scripts/AllApi.ts';

import { appName, routes } from '../Scripts/Data.ts';

async function detailsGetter(uid: string, update) {
    update(await getDetails(uid));
}

async function bidProject(bidder, price, duration, note, bidid, projectid) {
    return bidProj({
        bidder,
        price,
        duration,
        note,
        bidid,
        projectid,
    });
}

export default function Details() {
    const [bidpage, openBidPage] = useState(false);
    const [data, setData] = useState();
    const id = new URLSearchParams(document.location.search).get('id');
    if (!id) {
        document.location.href = '/';
        return <div />;
    }
    if (!data) {
        detailsGetter(id, setData);
        return <LinearProgress color="primary" />;
    }

    console.log(data);
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
                    <Button startIcon={<Message />} color="inherit" sx={{ mr: 2 }}>
                        Messages
                    </Button>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        $1200
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
                    <Typography variant="h1">{data.title}</Typography>
                    <Typography sx={{ mt: 1.5 }} variant="h3">
                        {data.price}
                    </Typography>
                    <Typography sx={{ mt: 10, mb: 2 }} variant="h5">
                        {data.details}
                    </Typography>
                    {localStorage.getItem('usertype') === 'worker' ? null : (
                        <div>
                            <Typography sx={{ mb: 2 }}>Current bidders: </Typography>
                            {JSON.parse(data.bidderlist).map((bid) => (
                                <Card sx={{ width: '400px' }}>
                                    <Typography
                                        variant="h5"
                                        onClick={() => {
                                            alert('Profile is not available !');
                                        }}
                                    >
                                        {bid.name}
                                    </Typography>
                                    <Typography variant="h6">{bid.email}</Typography>
                                    <Typography variant="h6">{`Price: ${bid.price}`}</Typography>
                                    <Typography variant="h6">
                                        {`Duration: ${bid.duration}`}
                                    </Typography>
                                    <Typography variant="h6">{bid.note}</Typography>
                                    <CardActions>
                                        <Typography sx={{ flexGrow: 1 }} />
                                        <Button
                                            onClick={() => {
                                                // some how setHandovered must be set
                                            }}
                                            color="success"
                                            variant="contained"
                                        >
                                            Accept
                                        </Button>
                                        <Typography sx={{ flexGrow: 1 }} />
                                        <Button color="error" variant="contained">
                                            Reject
                                        </Button>
                                        <Typography sx={{ flexGrow: 1 }} />
                                    </CardActions>
                                </Card>
                            ))}
                        </div>
                    )}
                    {localStorage.getItem('usertype') === 'worker' ? (
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '10%',
                                width: '350px',
                            }}
                            onClick={() => {
                                openBidPage(true);
                            }}
                        >
                            Bid this project
                        </Button>
                    ) : null}
                    <Dialog open={bidpage}>
                        <DialogTitle>
                            <Stack width="100%" direction="row">
                                <Typography sx={{ flexGrow: 1 }} variant="h6">
                                    {data.title}
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        openBidPage(false);
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <TextField fullWidth id="askedPrice" label="Asked Price" />
                            <TextField
                                fullWidth
                                id="askedDuration"
                                sx={{ mt: 2 }}
                                label="Duration"
                            />
                            <TextField fullWidth id="askedNotes" sx={{ mt: 2 }} label="Notes" />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    const p = document.getElementById('askedPrice').value;
                                    const q = document.getElementById('askedDuration').value;
                                    const r = document.getElementById('askedNotes').value;
                                    (async () => {
                                        await bidProject(
                                            localStorage.getItem('token'),
                                            p,
                                            q,
                                            r,
                                            Math.random(),
                                            id
                                        );
                                    })();
                                }}
                                variant="contained"
                                sx={{ textTransform: 'none' }}
                                fullWidth
                            >
                                Bid this project
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Card sx={{ mt: 5, width: 400 }}>
                        <CardContent>
                            <Typography variant="h5">Attachment.pdf</Typography>
                        </CardContent>
                        <CardActions>
                            <Button sx={{ flexGrow: 1 }} variant="contained">
                                Download
                            </Button>
                        </CardActions>
                    </Card>
                </Stack>
            </Container>
        </div>
    );
}
