'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  InputBase,
  IconButton,
  Chip,
  Link,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  Article as ArticleIcon,
  Help as HelpIcon,
  Build as BuildIcon,
  Launch as ExternalLinkIcon
} from '@mui/icons-material';

const KnowledgeBaseUI = () => {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid #e0e0e0',
        px: 3,
        py: 2
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <SearchIcon sx={{ color: 'gray', mr: 1 }} />
            <InputBase
              placeholder="Search articles..."
              sx={{ flex: 1, fontSize: '14px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="text"
              sx={{ 
                color: '#1976d2',
                textTransform: 'none',
                fontSize: '14px'
              }}
            >
              Manage
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ 
                bgcolor: '#1976d2',
                textTransform: 'none',
                fontSize: '14px'
              }}
              onClick={() => router.push('/solutions/create')} // Add this
            >
              New article
            </Button>
            <IconButton size="small">
              <ExternalLinkIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* My drafts section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
              My drafts
            </Typography>
            <Link href="#" sx={{ color: '#1976d2', textDecoration: 'none', fontSize: '14px' }}>
              View all
            </Link>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                '&:hover': { boxShadow: 1 }
              }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1, color: '#1976d2' }}>
                    How to Create a New User Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last edited 7 days ago
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                '&:hover': { boxShadow: 1 }
              }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1, color: '#1976d2' }}>
                    How to Update Software Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last edited 7 days ago
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                '&:hover': { boxShadow: 1 }
              }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1, color: '#1976d2' }}>
                    What to Do if the Software Crashes Frequently
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last edited 7 days ago
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Categories section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#333', mb: 2 }}>
            Categories (3)
          </Typography>
          
          <Grid container spacing={2}>
            {/* How tos */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                minHeight: '200px',
                '&:hover': { boxShadow: 1 }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ArticleIcon sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
                      How tos
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="primary">
                      Installation
                    </Typography>
                    <Chip 
                      label="01" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f0f0f0',
                        color: '#666',
                        fontSize: '12px'
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="primary">
                      Account creation
                    </Typography>
                    <Chip 
                      label="01" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f0f0f0',
                        color: '#666',
                        fontSize: '12px'
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* FAQs */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                minHeight: '200px',
                '&:hover': { boxShadow: 1 }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HelpIcon sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
                      FAQs
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="primary">
                      Updating software
                    </Typography>
                    <Chip 
                      label="01" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f0f0f0',
                        color: '#666',
                        fontSize: '12px'
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Troubleshooting */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                minHeight: '200px',
                '&:hover': { boxShadow: 1 }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BuildIcon sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
                      Troubleshooting
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="primary">
                      Software glitches and crashing
                    </Typography>
                    <Chip 
                      label="01" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f0f0f0',
                        color: '#666',
                        fontSize: '12px'
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="primary">
                      Login issues
                    </Typography>
                    <Chip 
                      label="01" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f0f0f0',
                        color: '#666',
                        fontSize: '12px'
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Chat widget */}
      <Box sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: '50%',
        bgcolor: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 3,
        '&:hover': { bgcolor: '#555' }
      }}>
        <Box sx={{
          width: 12,
          height: 12,
          bgcolor: '#ff5722',
          borderRadius: '50%',
          position: 'absolute',
          top: 8,
          right: 8,
          fontSize: '8px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          1
        </Box>
        <Box sx={{
          width: 24,
          height: 24,
          bgcolor: 'white',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box sx={{
            width: 16,
            height: 16,
            bgcolor: '#333',
            borderRadius: '2px'
          }} />
        </Box>
      </Box>
    </Box>
  );
};

export default KnowledgeBaseUI;