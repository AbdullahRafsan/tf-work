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
import { routes } from '../Scripts/Data.ts';

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
        <div>
            <img
                src={img1}
                style={{ height: '350px', width: '100%', objectFit: 'cover' }}
                alt="Cover"
            />
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
                        <Camera sx={{ position: 'absolute', color: '#FFFFFF', fontSize: '7rem' }} />
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
                        marginLeft: '30%',
                        marginTop: '-100px',
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
                <Typography
                    variant="h4"
                    color="#FFFFFF"
                    sx={{ marginLeft: '52%', marginTop: '-160px' }}
                >
                    {data.name}
                </Typography>
            )}
            <Typography sx={{ marginLeft: '52.3%', marginTop: '10px' }} variant="h6">
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
                <Typography textAlign="center" sx={{ marginTop: '110px' }} variant="h4">
                    {data.bio}
                </Typography>
            )}

            <Container>
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
                            // setData(f);
                            (async () => {
                                const d = await updateProfile(f);
                                if (d.status === 200) window.location.reload();
                            })();
                        }}
                        variant="contained"
                    >
                        Save Profile
                    </Button>
                ) : (
                    <Button
                        sx={{ mr: 4, textTransform: 'none' }}
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

                <Button
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('usertype');
                        window.location.href = routes.Root;
                    }}
                    sx={{ textTransform: 'none' }}
                    variant="contained"
                    color="error"
                >
                    Sign Out
                </Button>
            </Container>
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
                    sx={{ width: '80%', margin: '30px', marginLeft: '16.5%' }}
                >
                    {data.skills !== ' '
                        ? data.skills
                              .split(',')
                              .map((item) => <Chip sx={{ mr: 2, mb: 1 }} label={item} />)
                        : null}
                </Container>
            )}

            <Typography variant="h4" sx={{ mt: 5 }}>
                My Projects
            </Typography>
            <Grid container spacing={2}>
                {data.worked !== ' '
                    ? data.worked.map((item) => (
                          <Grid item xs={3}>
                              <Card>
                                  <CardContent>
                                      <Typography variant="h6">{item.title}</Typography>
                                      <Typography>{item.details}</Typography>
                                  </CardContent>
                              </Card>
                          </Grid>
                      ))
                    : null}
            </Grid>
        </div>
    );
}
