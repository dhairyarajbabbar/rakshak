import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function UploadProfilePicture() {
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}api/profile/upload-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true // Enable sending cookies
      });
  
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
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
            <PhotoCamera />
          </Avatar>
          <Typography component="h1" variant="h5">
            Upload Profile Picture
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="file"
              id="file"
              name="image"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload Picture
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/profile" variant="body2">
                  Back to Profile
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
