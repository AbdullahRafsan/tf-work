import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './Pages/App.tsx';
import Chatlist from './Pages/Chatlist.tsx';
import ClientHome from './Pages/ClientHome.tsx';
import Details from './Pages/Details.tsx';
import Inbox from './Pages/Inbox.tsx';
import Login from './Pages/Login.tsx';
import Nothing from './Pages/Nothing.tsx';
import NoUserHome from './Pages/NoUserHome.tsx';
import Profile from './Pages/Profile.tsx';
import Signup from './Pages/Signup.tsx';
import WorkerHome from './Pages/WorkerHome.tsx';
import WorkerProjects from './Pages/WorkerProjects.tsx';
import { routes } from './Scripts/Data.ts';
import { darkTheme } from './Scripts/Theme.ts';

const router = createBrowserRouter([
    {
        path: routes.Root,
        element: <App />,
        errorElement: <Nothing />,
    },
    {
        path: '/nothing',
        element: <Nothing />,
    },
    {
        path: routes.ClientHome,
        element: <ClientHome />,
    },
    {
        path: routes.DetailsPage,
        element: <Details />,
    },
    {
        path: routes.Home,
        element: <NoUserHome />,
    },
    {
        path: routes.Profile,
        element: <Profile />,
    },
    {
        path: routes.SignIn,
        element: <Login />,
    },
    {
        path: routes.WorkerHome,
        element: <WorkerHome />,
    },
    {
        path: routes.WorkerProject,
        element: <WorkerProjects />,
    },
    {
        path: routes.CreateAccount,
        element: <Signup />,
    },
    {
        path: routes.Chatlist,
        element: <Chatlist />,
    },
    {
        path: routes.Inbox,
        element: <Inbox />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
    </ThemeProvider>
);
