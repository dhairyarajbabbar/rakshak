import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Profile() {
  const [profileData, setProfileData] = React.useState(null);
  let navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}api/profile`, {
      withCredentials: true
    })
    .then(response => {
      setProfileData(response.data);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Your Profile
          </Typography>
          {profileData && (
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                value={profileData.name}
                disabled
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                value={profileData.email}
                disabled
              />
              <TextField
                margin="normal"
                fullWidth
                id="address"
                label="Address"
                value={profileData.address}
                disabled
              />
              <TextField
                margin="normal"
                fullWidth
                id="contact"
                label="Contact"
                value={profileData.contact}
                disabled
              />
              {/* Additional fields can be added for other profile information */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate('/editprofile')}
              >
                Edit Profile
              </Button>
            </Box>
          )}
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                Back to Home
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
