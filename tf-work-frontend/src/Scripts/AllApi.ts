import { User } from './Classlist.ts';

const URL = 'http://localhost:4000/';
// const URL = '/';

export async function setProfile(profile) {
    const request = await fetch(`${URL}api/profile/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    });
    const response = await request.json();
    return { status: response.status };
}

export async function postWork(work) {
    const request = await fetch(`${URL}api/project/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(work),
    });
    const response = await request.json();
    return { status: response.status };
}

export async function bidProj(bidObj) {
    const request = await fetch(`${URL}api/bid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidObj),
    });
    const response = await request.json();
    return { status: response.status };
}

export async function performAuth(user: string, password: string) {
    // /api/login
    const request = await fetch(`${URL}api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user,
            password,
        }),
    });
    const response = await request.json();
    return { token: response.token, status: response.status, usertype: response.usertype };
}

export async function performCreateUser(user: User) {
    // /api/signup
    console.log(user);
    const request = await fetch(`${URL}api/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: user.n,
            password: user.p,
            email: user.e,
            usertype: user.t,
            address: user.a,
            worked: user.w,
        }),
    });
    const response = await request.json();
    return response.status;
}

export async function getDetails(projectID: string) {
    // /api/project/details?id=id
    const request = await fetch(`${URL}api/project/details?id=${projectID}`, {
        cookie: localStorage.getItem('token'),
    });
    const response = await request.json();
    return {
        title: response.title,
        price: response.price,
        details: response.details,
        isHandovered: response.isHandovered,
        bidderlist: response.bidderlist,
    };
}

export async function getMessage() {
    // /api/message
    const request = await fetch(`${URL}/api/message`, {
        method: 'GET',
        cookie: localStorage.getItem('token'),
    });
    const response = await request.json();
    return response.message;
}

export async function sendMessage(msg: string, senderID: string, reciverID: string) {
    // /api/message
    const request = await fetch(`${URL}/api/message`, {
        method: 'POST',
        body: {
            msg,
            senderID,
            reciverID,
        },
        cookie: localStorage.getItem('token'),
    });
    const response = await request.json();
    return response.status;
}

export async function getChatList() {
    // /api/chat
    const request = await fetch(`${URL}api/chat`, {
        method: 'GET',
        cookie: localStorage.getItem('token'),
    });
    const response = await request.json();
    const { id, image, name } = response;
    return { id, image, name };
}

export async function getProfile(uid: string) {
    // /api/profile?id=id
    const request = await fetch(`${URL}api/profile?id=${uid}`, {
        method: 'GET',
        cookie: localStorage.getItem('token'),
    });
    const response = await request.json();
    // const { name, email, bio, photo, skills, worked } = response;
    return response;
}

export async function getAllProject(filter: string, filterType: number) {
    // /api/project
    const request = await fetch(`${URL}api/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filter,
            filterType,
        }),
        cookie: localStorage.getItem('token'),
    });
    const response = await request.json();
    return response;
}

export async function getMyProject(uid: string) {
    return getAllProject(uid, 1);
}
