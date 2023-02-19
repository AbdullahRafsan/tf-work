import { Button, Typography } from '@mui/material';
import homeBG from '../Images/img5.jpg';
import { Checker } from '../Scripts/AllMethods.ts';
import { routes } from '../Scripts/Data.ts';
import '../Styles/HomeDef.css';

export default function NoUserHome() {
    Checker();
    return (
        <div className="container">
            <img src={homeBG} alt="Home bg" className="brand-image" />
            <div className="container-2">
                <div className="container-brand">
                    <Typography className="welcome-text">Welcome to</Typography>
                    <Typography className="brand-text" color="primary">
                        24/7 Work
                    </Typography>
                    <Typography className="moto-text">
                        We connect you with the professionals to get your job done. Our experts push
                        themselves to their absolute limit so you can breathe in relief.
                    </Typography>
                </div>
                <div className="container-join">
                    <Typography className="join-text">
                        Want to hire someone ?<br />
                        Or,
                        <br />
                        Test your abilities
                    </Typography>
                    <Button
                        variant="contained"
                        className="join-btn"
                        onClick={() => {
                            window.location.href = routes.SignIn;
                        }}
                    >
                        Join Us
                    </Button>
                </div>
            </div>
        </div>
    );
}
