import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FFD740',
        },
        black: {
            main: '#000000',
        },
        white: {
            main: '#FFFFFF',
        },
        text: {
            primary: '#0a0a0a',
        },
    },
});
export const toolbarSearchBoxTheme = createTheme({
    palette: {
        mode: 'dark',
        white: {
            main: '#FFFFFF',
        },

        primary: {
            main: '#FFFFFFF',
        },
        secondary: {
            main: '#FFFFFF',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
        },
    },
});
