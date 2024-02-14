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

export default function EditProfile() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    address: '',
    contact: '',
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}api/profile`, {
      withCredentials: true
    })
    .then(response => {
      const { name, email, address, contact } = response.data;
      setFormData({ name, email, address, contact });
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${process.env.REACT_APP_BASEURL}api/profile/update`, formData, {
        withCredentials: true
      });
      navigate('/profile');
    } catch (error) {
      setErrorMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

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
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="contact"
              name="contact"
              label="Contact"
              value={formData.contact}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
            {errorMessage && (
              <Typography variant="body2" color="error" align="center">
                {errorMessage}
              </Typography>
            )}
          </Box>
          <Grid container>
            <Grid item>
              <Link href="/profile" variant="body2">
                Cancel
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
