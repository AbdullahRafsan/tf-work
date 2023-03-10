/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Close, Refresh } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import sendImg from '../Images/send.png';
import { bidProj, getDetails, getMessage, handover, sendMessage } from '../Scripts/AllApi.ts';
import { appName, routes } from '../Scripts/Data.ts';
import '../Styles/Details.css';

const imgFalse =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQAAAACl8iCgAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQfnAhQGJgpFqAS6AAAADElEQVQI12NgoC4AAABQAAEiE+h1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTAyLTIwVDA2OjM3OjM1KzAwOjAwkgDXZQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wMi0yMFQwNjozNzozNSswMDowMONdb9kAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDItMjBUMDY6Mzg6MTArMDA6MDBVXj1RAAAAAElFTkSuQmCC';

async function detailsGetter(uid: string, update) {
    const dta = await getDetails(uid);
    const emi =
        dta.isHandovered !== null
            ? localStorage.getItem('usertype') === 'client'
                ? JSON.parse(dta.isHandovered).bidder.email
                : JSON.parse(localStorage.getItem('token')).email
            : '';
    const msg = await getMessage(emi);
    update(dta, msg);
}

async function bidProject(bidder, price, duration, note, bidid, projectid) {
    return bidProj({
        bidder: JSON.parse(bidder),
        price,
        duration,
        note,
        bidid,
        projectid,
    });
}

export default function Details() {
    const [bidpage, openBidPage] = useState(false);
    const [optionsOpen, setoptionsOpen] = useState(false);
    const [anch, setanc] = useState(null);
    const [data, setData] = useState();
    const [msg, setmsg] = useState(null);
    const isBidded = () => {
        const bidder = JSON.parse(localStorage.getItem('token')).email;
        const list = JSON.parse(data.bidderlist);
        console.log(list);
        for (const i in list) {
            if (list[i].bidder.email === bidder) {
                console.log('I am the worker for this project');
                return true;
            }
        }
        return false;
    };
    const id = new URLSearchParams(document.location.search).get('id');
    if (!id) {
        document.location.href = '/';
        return <div />;
    }

    const up = (dta, ms) => {
        setData(dta);
        setmsg(ms);
    };

    if (!data) {
        detailsGetter(id, up);
        return <LinearProgress color="primary" />;
    }

    console.log(data);
    console.log(msg);
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
            <div className="container-det">
                <div className="detail-cont">
                    <Stack>
                        <Typography sx={{ fontWeight: 500, fontSize: 32 }}>{data.title}</Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 26 }}>
                            {data.fromClient}
                        </Typography>
                        <Typography sx={{ fontSize: 28, mt: 2 }}>{data.price}</Typography>
                        <Typography sx={{ mt: 8, mb: 2 }} variant="h5">
                            {data.details}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '5rem',
                                width: '350px',
                                display:
                                    localStorage.getItem('usertype') === 'worker'
                                        ? isBidded()
                                            ? 'none'
                                            : 'block'
                                        : 'block',
                            }}
                            onClick={() => {
                                if (localStorage.getItem('usertype') === 'worker') {
                                    openBidPage(true);
                                } else {
                                    console.log('TBD');
                                }
                            }}
                        >
                            {localStorage.getItem('usertype') === 'worker'
                                ? 'Bid the project'
                                : 'Project Complete'}
                        </Button>
                        {data.isHandovered !== null ? (
                            JSON.parse(data.isHandovered).bidder.email ===
                            JSON.parse(localStorage.getItem('token')).email ? null : (
                                <Typography>
                                    {'This project is handovered to: '}
                                    <a
                                        href={`/profile?id=${
                                            JSON.parse(data.isHandovered).bidder.email
                                        }`}
                                    >
                                        {`${JSON.parse(data.isHandovered).bidder.name}`}
                                    </a>
                                </Typography>
                            )
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
                                            const x = await bidProject(
                                                localStorage.getItem('token'),
                                                p,
                                                q,
                                                r,
                                                Math.random(),
                                                id
                                            );
                                            console.log(x);
                                            if (x.status === 'OK') window.location.reload();
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
                        <div
                            style={{
                                display:
                                    data.isHandovered !== null
                                        ? JSON.parse(data.isHandovered).bidder.email ===
                                              JSON.parse(localStorage.getItem('token')).email ||
                                          localStorage.getItem('usertype') === 'client'
                                            ? 'block'
                                            : 'none'
                                        : 'block',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '5rem',
                                    width: '400px',
                                }}
                            >
                                <Typography sx={{ fontSize: 28, flexGrow: 1 }}>
                                    Attachments:
                                </Typography>
                                <Button color="primary" variant="contained">
                                    Upload
                                </Button>
                            </div>
                            <Card
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    mt: 2,
                                    width: 400,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5">Attachment.pdf</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained">Download</Button>
                                </CardActions>
                            </Card>
                        </div>
                    </Stack>
                </div>
                <div
                    style={{
                        display:
                            data.isHandovered !== null
                                ? JSON.parse(data.isHandovered).bidder.email ===
                                      JSON.parse(localStorage.getItem('token')).email ||
                                  localStorage.getItem('usertype') === 'client'
                                    ? 'block'
                                    : 'none '
                                : 'none',
                    }}
                    className="msg-pane"
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            background: '#FFD740',
                        }}
                    >
                        <Typography
                            sx={{
                                padding: '10px',
                                textAlign: 'center',
                                fontWeight: 500,
                                fontSize: 22,
                            }}
                        >
                            {data.isHandovered !== null
                                ? localStorage.getItem('usertype') === 'client'
                                    ? JSON.parse(data.isHandovered).bidder.name
                                    : data.fromClient
                                : ' '}
                        </Typography>
                        <div
                            onClick={() => {
                                // window.location.reload();
                                detailsGetter(id, up);
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Refresh />
                        </div>
                    </div>
                    <Card
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            padding: '20px',
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            {msg.map((item) => {
                                const sender = JSON.parse(localStorage.getItem('token')).email;
                                const recver =
                                    localStorage.getItem('usertype') === 'client'
                                        ? data.isHandovered !== null
                                            ? JSON.parse(data.isHandovered).bidder.email
                                            : ''
                                        : data.fromClient;
                                if (item.sender !== sender && item.sender !== recver) return null;
                                if (item.client !== sender && item.client !== recver) return null;

                                return (
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 'min-content',
                                            display: 'flex',
                                            justifyContent:
                                                item.sender !== sender ? 'flex-start' : 'flex-end',
                                        }}
                                    >
                                        <Card
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                marginBottom: '20px',
                                                backgroundColor:
                                                    item.sender !== sender ? '#FFFFFF' : '#FFE082',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 16,
                                                    padding: '10px',
                                                }}
                                            >
                                                {item.msg}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    paddingTop: '5px',
                                                    paddingRight: '15px',
                                                    fontSize: 10,
                                                }}
                                            >
                                                {item.time}
                                            </Typography>
                                        </Card>
                                    </div>
                                );
                            })}
                        </CardContent>
                        <CardActions>
                            <TextField id="textmsg" />
                            <img
                                style={{ width: '60px', height: '60px' }}
                                onClick={async () => {
                                    const text = document.getElementById('textmsg').value;
                                    const time = new Date().toLocaleTimeString();
                                    const sender = JSON.parse(localStorage.getItem('token')).email;
                                    const recver =
                                        localStorage.getItem('usertype') === 'client'
                                            ? JSON.parse(data.isHandovered).bidder.email
                                            : data.fromClient;
                                    await sendMessage(text, sender, recver, time);
                                    window.location.reload();
                                }}
                                alt=""
                                src={sendImg}
                            />
                        </CardActions>
                    </Card>
                </div>
                {localStorage.getItem('usertype') === 'worker' ? null : (
                    <div
                        style={{
                            display: data.isHandovered ? 'none' : 'block ',
                        }}
                        className="bid-cont"
                    >
                        <Typography sx={{ mb: 7, fontWeight: '500', fontSize: 32 }}>
                            Bidders:{' '}
                        </Typography>
                        {JSON.parse(data.bidderlist).map((bid) => (
                            <Card
                                sx={{
                                    width: '400px',
                                    mb: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: '20px',
                                        display: 'flex',
                                    }}
                                >
                                    {console.log(bid.bidder.pic === ' ')}
                                    <img
                                        style={{
                                            borderRadius: '50px',
                                            width: '50px',
                                            height: '50px',
                                        }}
                                        alt=""
                                        src={bid.bidder.pic !== ' ' ? bid.bidder.pic : imgFalse}
                                    />
                                    <div style={{ marginLeft: '40px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginRight: '40px',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '20px',
                                                        fontWeight: '500',
                                                    }}
                                                    onClick={() => {
                                                        alert('Profile is not available !');
                                                    }}
                                                >
                                                    {bid.bidder.name}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: 300,
                                                    }}
                                                >
                                                    {bid.bidder.email}
                                                </Typography>
                                            </div>

                                            <Typography
                                                sx={{
                                                    fontSize: '20px',
                                                }}
                                            >{`$${bid.price}`}</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Typography
                                        sx={{ m: 2, fontSize: 20 }}
                                    >{`Duration: ${bid.duration}`}</Typography>
                                    <Typography sx={{ m: 2, fontSize: 20 }}>{bid.note}</Typography>
                                </div>

                                <CardActions sx={{ width: '95%' }}>
                                    <Button color="error" variant="outlined">
                                        Reject
                                    </Button>
                                    <Typography sx={{ flexGrow: 2 }} />
                                    <Button
                                        onClick={async () => {
                                            await handover({ hand: bid, projid: id });
                                            window.location.reload();
                                        }}
                                        color="success"
                                        variant="outlined"
                                    >
                                        Accept
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
