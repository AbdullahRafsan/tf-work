import AcUnitIcon from '@mui/icons-material/AcUnit';
import { AppBar, Button, Icon, Toolbar, Typography } from '@mui/material';
import { Checker } from '../Scripts/AllMethods.ts';
import { routes } from '../Scripts/Data.ts';

export default function NoUserHome() {
    Checker();
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
                        Log in
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
