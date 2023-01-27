import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
    mode: 'light',
});
export const darkTheme = createTheme({
    mode: 'dark',
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
