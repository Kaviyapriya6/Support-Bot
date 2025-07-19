'use client'
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import {
  Support as SupportIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  AutoFixHigh as AutoFixHighIcon,
  Groups as GroupsIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const features = [
    {
      icon: <SupportIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Customer Support',
      description: 'Streamline customer inquiries with our intuitive ticketing system'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      title: 'Fast Response',
      description: 'Quick resolution times with automated workflows and smart routing'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 48, color: 'info.main' }} />,
      title: 'Analytics & Reports',
      description: 'Detailed insights into your support performance and customer satisfaction'
    },
    {
      icon: <AutoFixHighIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: 'AI-Powered',
      description: 'Smart automation and AI assistance for better customer experiences'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 48, color: 'error.main' }} />,
      title: 'Team Collaboration',
      description: 'Seamless collaboration tools for your support team'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '99.9%', label: 'Uptime' },
    { number: '<2min', label: 'Avg Response Time' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navigation Header */}
      <Box sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            py: 2
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.5px'
              }}
            >
              Support Bot
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => router.push('/auth/login')}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push('/auth/signup')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white' }}>
              <Chip 
                label="✨ New: AI-Powered Support Assistant" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  mb: 3,
                  fontWeight: 500
                }}
              />
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Transform Your Customer Support
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Deliver exceptional customer experiences with our comprehensive support platform. 
                Manage tickets, contacts, and teams all in one place.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/auth/signup')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/auth/login')}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              {/* Stats Cards */}
              <Grid container spacing={2}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Card sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <CardContent sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {stat.number}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              fontWeight: 700,
              color: 'white',
              mb: 2
            }}
          >
            Why Choose Support Bot?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              color: 'white',
              opacity: 0.8,
              mb: 6,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Everything you need to deliver outstanding customer support experiences
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        py: 6
      }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
              Join thousands of companies using Support Bot to deliver amazing customer experiences.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/auth/signup')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.2rem',
                px: 6,
                py: 2,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
