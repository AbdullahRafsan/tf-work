import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import edu from '../Images/edu.png';
import exp from '../Images/exp.png';
import profilePic from '../Images/img2.jpg';
import img1 from '../Images/img4.jpg';
import port from '../Images/Portfolio.png';
import rev from '../Images/Review.png';
import { getProfile, setProfile } from '../Scripts/AllApi.ts';
import '../Styles/Profile.css';

async function profiler(uid: string, update) {
    update(await getProfile(uid));
}

async function updateProfile(profile) {
    const g = await setProfile(profile);
    console.log(g);
    return g;
}

export default function Profile() {
    const [data, setData] = useState();
    const [editor, openEdit] = useState(false);
    const id = new URLSearchParams(document.location.search).get('id');
    const name = useRef('');
    const address = useRef('');
    const bio = useRef('');
    const skill = useRef('');
    const photo = useRef('');
    // const [photo, setphoto] = useState('');

    if (!id) {
        document.location.href = '/';
        return <div />;
    }
    if (!data) {
        profiler(id, setData);
        return <LinearProgress color="primary" />;
    }

    name.current = data.name;
    address.current = data.address;
    bio.current = data.bio;
    skill.current = data.skills;
    photo.current = data.photo;
    console.log(data);
    return (
        <div style={{ height: '100vh' }}>
            <img
                src={img1}
                style={{ height: '70%', width: '100%', objectFit: 'cover' }}
                alt="Cover"
            />
            <div
                style={{
                    position: 'absolute',
                    top: '30%',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div className="profile-cont">
                    <div className="pc-1">
                        <img
                            id="propic"
                            className="profile-pic"
                            src={data.photo !== ' ' ? data.photo : profilePic}
                            alt=""
                        />
                        <input
                            style={{ display: editor ? 'block' : 'none' }}
                            type="file"
                            accept=".png,.jpg,.jpeg,.bmp"
                            onChange={(event) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(event.target.files[0]);
                                reader.onload = () => {
                                    photo.current = reader.result;
                                    document.getElementById('propic').src = reader.result;
                                };
                            }}
                        />
                        <Typography sx={{ fontWeight: 300, fontSize: 24, mb: '30px' }}>
                            $ 25 USD / hour
                        </Typography>
                        <Typography
                            sx={{
                                display: editor ? 'none' : 'block',
                                fontWeight: 300,
                                fontSize: 24,
                            }}
                        >
                            {address.current}
                        </Typography>
                        <TextField
                            fullWidth
                            id="addrText"
                            sx={{ display: editor ? 'block' : 'none' }}
                        />
                    </div>
                    <div className="pc-2">
                        <div style={{ display: 'flex' }}>
                            <Typography
                                sx={{
                                    display: editor ? 'none' : 'block',
                                    fontSize: 22,
                                    fontWeight: 600,
                                }}
                            >
                                {name.current}
                            </Typography>
                            <TextField id="nameText" sx={{ display: editor ? 'block' : 'none' }} />
                            <Button
                                variant="outlined"
                                sx={{ ml: 20 }}
                                onClick={() => {
                                    if (editor) {
                                        updateProfile({
                                            address: document.getElementById('addrText').value,
                                            photo: document.getElementById('propic').src,
                                            name: document.getElementById('nameText').value,
                                            email: JSON.parse(localStorage.getItem('token')).email,
                                            skills: document.getElementById('skillText').value,
                                            bio: document.getElementById('bioText').value,
                                            worked: null,
                                        });
                                        const ttt = JSON.parse(localStorage.getItem('token'));
                                        localStorage.setItem(
                                            'token',
                                            JSON.stringify({
                                                email: ttt.email,
                                                name: ttt.name,
                                                pic: document.getElementById('propic').src,
                                            })
                                        );
                                        window.location.reload();
                                    } else {
                                        document.getElementById('nameText').value = name.current;
                                        document.getElementById('addrText').value = address.current;
                                        document.getElementById('skillText').value = skill.current;
                                        document.getElementById('bioText').value = bio.current;
                                        openEdit(true);
                                    }
                                }}
                            >
                                {' '}
                                {editor ? 'Save Profile' : 'Edit Profile'}
                            </Button>
                            <Button
                                sx={{
                                    ml: 2,
                                    display: editor ? 'block' : 'none',
                                }}
                                onClick={() => {
                                    window.location.reload();
                                }}
                                variant="outlined"
                                color="error"
                            >
                                Cancel
                            </Button>
                        </div>
                        <Typography>{data.email}</Typography>
                        <Typography
                            sx={{
                                display: editor ? 'none' : 'block',
                                fontWeight: 300,
                                fontSize: 22,
                                mt: 3,
                            }}
                        >
                            {data.skills.split(',').map((item, index) => {
                                if (index !== 0) return ` | ${item}`;
                                return item;
                            })}
                        </Typography>
                        <TextField
                            fullWidth
                            id="skillText"
                            sx={{ mt: 3, display: editor ? 'block' : 'none' }}
                        />
                        <Typography
                            sx={{
                                display: editor ? 'none' : 'block',
                                mt: 10,
                                fontSize: 24,
                                fontWeight: 300,
                            }}
                        >
                            {bio.current}
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            id="bioText"
                            sx={{ mt: 10, display: editor ? 'block' : 'none' }}
                        />
                    </div>
                </div>
                <img className="port" alt="" src={port} />
                <img className="port" alt="" src={rev} />
                <img className="port" alt="" src={exp} />
                <img className="port" alt="" src={edu} />
            </div>
        </div>
    );
}
