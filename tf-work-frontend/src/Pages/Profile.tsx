import { Camera } from '@mui/icons-material';
import {
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    LinearProgress,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import profilePic from '../Images/img2.jpg';
import img1 from '../Images/img4.jpg';
import { getProfile, setProfile } from '../Scripts/AllApi.ts';

async function profiler(uid: string, update) {
    update(await getProfile(uid));
}

async function updateProfile(profile) {
    const g = await setProfile(profile);
    return g;
}

export default function Profile() {
    const [data, setData] = useState();
    const [editor, openEdit] = useState(false);
    const id = new URLSearchParams(document.location.search).get('id');
    const [name, setname] = useState('');
    const [bio, setbio] = useState('');
    const [skill, setskill] = useState('');
    const [photo, setphoto] = useState('');
    if (!id) {
        document.location.href = '/';
        return <div />;
    }
    if (!data) {
        profiler(id, setData);
        return <LinearProgress color="primary" />;
    }
    console.log(data);
    return (
        <div style={{ height: '100vh', backgroundColor: '#DDDDDD' }}>
            <img
                src={img1}
                style={{ height: '350px', width: '100%', objectFit: 'cover' }}
                alt="Cover"
            />

            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    position: 'fixed',
                    left: '25%',
                    top: '20%',
                    width: '50%',
                    height: '100%',
                }}
            >
                {editor ? (
                    <div>
                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '200px',
                                marginLeft: '30%',
                                marginTop: '-100px',
                                height: '200px',
                                objectFit: 'cover',
                                backgroundColor: '#0000007a',
                                border: '3px solid white',
                                borderRadius: '50%',
                            }}
                        >
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.bmp,.svg"
                                onChange={(event) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(event.target.files[0]);
                                    reader.onload = () => {
                                        setphoto(reader.result);
                                    };
                                }}
                            />
                            <Camera
                                sx={{ position: 'absolute', color: '#FFFFFF', fontSize: '7rem' }}
                            />
                        </div>
                        <img
                            src={data.photo || profilePic}
                            style={{
                                width: '200px',
                                marginLeft: '30%',
                                marginTop: '-100px',
                                height: '200px',
                                objectFit: 'cover',
                                border: '3px solid white',
                                borderRadius: '50%',
                            }}
                            alt="Profile"
                        />{' '}
                    </div>
                ) : (
                    <img
                        src={data.photo || profilePic}
                        style={{
                            width: '200px',
                            marginLeft: '7.42%',
                            marginTop: '50px',
                            height: '200px',
                            objectFit: 'cover',
                            border: '3px solid white',
                            borderRadius: '50%',
                        }}
                        alt="Profile"
                    />
                )}

                {editor ? (
                    <TextField
                        sx={{
                            marginLeft: '52%',
                            marginTop: '-160px',
                            color: '#FFFFFF',
                            backgroundColor: '#FFFFFF',
                        }}
                        onChange={(event) => {
                            setname(event.target.value);
                        }}
                        value={name}
                    />
                ) : (
                    <Typography variant="h4" sx={{ marginLeft: '38%', marginTop: '-21%' }}>
                        {data.name}
                    </Typography>
                )}
                <Typography sx={{ marginLeft: '38.3%', marginTop: '10px' }} variant="h6">
                    {data.email}
                </Typography>
                {editor ? (
                    <TextField
                        onChange={(event) => {
                            setbio(event.target.value);
                        }}
                        value={bio}
                        sx={{ marginTop: '100px' }}
                    />
                ) : (
                    <Typography
                        textAlign="start"
                        sx={{ marginTop: '1.5%', marginLeft: '38%' }}
                        variant="h5"
                    >
                        {data.bio}
                    </Typography>
                )}

                {editor ? (
                    <Button
                        sx={{ mr: 4, textTransform: 'none' }}
                        onClick={() => {
                            const f = {
                                name,
                                skills: skill,
                                bio,
                                photo,
                                worked: data.worked,
                                email: data.email,
                            };
                            openEdit(false);
                            setData(f);
                            (async () => {
                                const d = await updateProfile(f);
                                if (d.status === 200) window.location.reload();
                                else {
                                    console.log(d);
                                }
                            })();
                        }}
                        variant="contained"
                    >
                        Save Profile
                    </Button>
                ) : (
                    <Button
                        sx={{
                            position: 'absolute',
                            left: '85.92%',
                            top: '1.75%',
                            textTransform: 'none',
                        }}
                        onClick={() => {
                            setname(data.name);
                            setskill(data.skills);
                            setbio(data.bio);
                            setphoto(data.photo);
                            openEdit(true);
                        }}
                        variant="contained"
                    >
                        Edit Profile
                    </Button>
                )}

                {editor ? (
                    <TextField
                        value={skill}
                        onChange={(event) => {
                            setskill(event.target.value);
                        }}
                        fullWidth
                    />
                ) : (
                    <Container
                        spacing={2}
                        direction="row"
                        sx={{ width: '80%', margin: '30px', marginLeft: '35%' }}
                    >
                        {data.skills !== ' '
                            ? data.skills.split(',').map((item) => (
                                  <Chip
                                      sx={{
                                          mr: 2,
                                          color: '#FFFFFF',
                                          backgroundColor: '#0a0a0a',
                                          mb: 1,
                                      }}
                                      label={item}
                                  />
                              ))
                            : null}
                    </Container>
                )}

                <Typography variant="h4" sx={{ ml: '5%', mt: 5 }}>
                    Worked so far,
                </Typography>
                <Grid container spacing={2}>
                    {data.worked !== ' ' ? (
                        data.worked.map((item) => (
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.title}</Typography>
                                        <Typography>{item.details}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            sx={{
                                ml: '42%',
                                mt: '12%',
                            }}
                        >
                            Nothing has done so far.
                        </Typography>
                    )}
                </Grid>
            </div>
        </div>
    );
}
