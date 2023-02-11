import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#F2AB22',
        },
        black: {
            main: '#000000',
        },
        firozAmber: {
            main: '#F2AB22',
        },
        white: {
            main: '#FFFFFF',
        },
        text: {
            primary: '#000000',
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
