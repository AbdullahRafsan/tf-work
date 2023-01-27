// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const app = initializeApp(JSON.parse(atob("eyJhcGlLZXkiOiJBSXphU3lDQktTb0JXbnRZa2VBUjZ2MDlpQTRRNm5nR0lsdWhqQ1EiLCJhdXRoRG9tYWluIjoidHJlZWw0bmMzci5maXJlYmFzZWFwcC5jb20iLCJwcm9qZWN0SWQiOiJ0cmVlbDRuYzNyIiwic3RvcmFnZUJ1Y2tldCI6InRyZWVsNG5jM3IuYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjYyMDA4MjkyNjYyMSIsImFwcElkIjoiMTo2MjAwODI5MjY2MjE6d2ViOmZkMjFiNzkxNjY3YzAxMGM2M2UyZjQifQ==")));
// export const db = getFirestore(app);

export const appName = '24Work';

export const routes = {
    Home: '/home',
    Root: '/',
    ClientHome: '/home/client',
    WorkerHome: '/home/worker',
    WorkerProject: '/home/worker/projects',
    SignIn: '/login',
    Chatlist: '/chatlist',
    Inbox: '/chatlist/inbox',
    CreateAccount: '/signup',
    DetailsPage: '/details',
    Profile: '/profile',
};
