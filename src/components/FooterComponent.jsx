// FooterComponent.jsx
import React from 'react';
import { Typography, Link, Box, Container, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const FooterComponent = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to bottom, white, #F0b5fa)',
        p: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are dedicated to providing top-quality healthcare services and easy appointment booking for our patients.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Healthcare Avenue, Medical City, HC 12345
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@drappointments.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +250 788-887-567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link href="https://twitter.com/" color="inherit" sx={{ pl: 1, pr: 1 }}>
              <Twitter />
            </Link>
            <Link href="https://www.linkedin.com/" color="inherit" sx={{ pr: 1 }}>
              <LinkedIn />
            </Link>
            <Link href="https://www.instagram.com/" color="inherit">
              <Instagram />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://drappointments.com/">
              Dr. Appointments
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default FooterComponent;