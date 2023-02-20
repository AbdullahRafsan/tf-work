/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { AppBar, Button, Icon, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

import { appName, routes } from '../Scripts/Data.ts';

export default function WorkerHome() {
    const [anch, setanc] = useState(null);
    const [optionsOpen, setoptionsOpen] = useState(false);
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
                            window.location.href = routes.WorkerHome;
                        }}
                        color="inherit"
                    >
                        All projects
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
        </div>
    );
}
