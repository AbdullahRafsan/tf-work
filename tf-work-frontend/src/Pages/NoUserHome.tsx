import { Facebook, LinkedIn, Twitter, WhatsApp, YouTube } from '@mui/icons-material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    Icon,
    List,
    ListItem,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import homeBG from '../Images/img3.jpg';
import { Checker } from '../Scripts/AllMethods.ts';
import { routes } from '../Scripts/Data.ts';

export default function NoUserHome() {
    Checker();
    return (
        <div>
            <img
                src={homeBG}
                alt="Home bg"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.6,
                }}
            />
            <AppBar position="fixed" sx={{ backgroundColor: '#F2AB22' }}>
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
                        Log in
                    </Button>
                </Toolbar>

                <Card
                    elevation={0}
                    sx={{
                        position: 'fixed',
                        top: 150,
                        left: 100,
                        backgroundColor: '#00000042',
                        p: 3,
                    }}
                >
                    <CardContent>
                        <Typography sx={{ color: '#FFFFFF' }} variant="h4">
                            Hire the best freelancers for any job online
                        </Typography>
                        <Typography sx={{ mt: 2, color: '#FFFFFF' }} variant="h6" fontWeight={400}>
                            We offer many jobs. Such as Logo designe Programmer 3d artist Vfx artist
                            and more
                        </Typography>

                        <List>
                            <ListItem>
                                <Typography sx={{ color: '#FFFFFF' }}>Photographer</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={{ color: '#FFFFFF' }}>Logo designe</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={{ color: '#FFFFFF' }}>Programmer</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={{ color: '#FFFFFF' }}>3D Artist</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={{ color: '#FFFFFF' }}>VFX Artist</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography sx={{ color: '#FFFFFF' }}>and More</Typography>
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="firozAmber"
                            sx={{
                                textTransform: 'none',
                            }}
                        >
                            Hire Someone
                        </Button>
                        <Button
                            color="white"
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                                color: '#000000',
                            }}
                        >
                            Explore your opertunities
                        </Button>
                    </CardActions>
                </Card>

                <Toolbar
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#0A0A0A',
                        justifyContent: 'center',
                    }}
                >
                    <Stack direction="column" sx={{ m: 2, alignItems: 'center' }}>
                        <Typography variant="h4">24 Work</Typography>
                        <Typography variant="body" fontFamily="Roboto">
                            All about freelancing and nothing
                        </Typography>
                        <Stack spacing={2} sx={{ mt: 2 }} direction="row">
                            <Icon>
                                <Facebook sx={{ color: '#4267B2' }} />
                            </Icon>
                            <Icon>
                                <YouTube sx={{ color: '#FF0000' }} />
                            </Icon>
                            <Icon>
                                <Twitter sx={{ color: '#00ACEE' }} />
                            </Icon>
                            <Icon>
                                <LinkedIn sx={{ color: '#0072b1' }} />
                            </Icon>
                            <Icon>
                                <WhatsApp sx={{ color: '#25D366' }} />
                            </Icon>
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}
