import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Homepage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                User Profile
              </Typography>
              <Button component={Link} to="/profile" variant="contained" color="primary">
                View/Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Document Management
              </Typography>
              <Button component={Link} to="/documents" variant="contained" color="primary">
                View Documents
              </Button>
              <Button component={Link} to="/upload" variant="contained" color="primary">
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Exam Management
              </Typography>
              <Button component={Link} to="/exams" variant="contained" color="primary">
                View Exams
              </Button>
              <Button component={Link} to="/start-exam" variant="contained" color="primary">
                Start New Exam
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more Grid items for other features */}
      </Grid>
    </Container>
  );
};

export default Homepage;
