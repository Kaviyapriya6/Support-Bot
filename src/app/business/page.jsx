'use client'
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Link,
  Divider,
  Chip
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayArrowIcon,
  Chat as ChatIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const BusinessHoursUI = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        padding: 3,
        maxWidth: '800px'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '1.5rem'
            }}>
              Business Hours
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderColor: '#d1d5db',
                color: '#6b7280',
                '&:hover': {
                  borderColor: '#9ca3af',
                  backgroundColor: '#f9fafb'
                }
              }}
            >
              Take a tour
            </Button>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e40af',
              color: 'white',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              padding: '8px 16px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
            }}
          >
            Add business hours
          </Button>
        </Box>

        {/* Business Hours Card */}
        <Card sx={{ 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <CardContent sx={{ padding: '24px' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: 2
            }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                  <InfoIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                  <Typography sx={{ 
                    fontWeight: 500,
                    color: '#1a1a1a',
                    fontSize: '0.875rem'
                  }}>
                    General working hours
                  </Typography>
                </Box>
                <Typography sx={{ 
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  marginBottom: 1
                }}>
                  (GMT-04:00) Eastern Time (US & Canada) • 7 groups associated
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: '#6b7280' }}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Right Sidebar */}
      <Box sx={{ 
        width: 320,
        backgroundColor: 'white',
        padding: 3,
        borderLeft: '1px solid #e5e7eb',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          color: '#1a1a1a',
          fontSize: '1rem',
          marginBottom: 1
        }}>
          Business hours
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ marginBottom: 3 }}>
          <Button
            variant="text"
            startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: '#2563eb',
              padding: '4px 0',
              justifyContent: 'flex-start',
              marginBottom: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            Start a guided tour
          </Button>
          <Button
            variant="text"
            startIcon={<ChatIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: '#2563eb',
              padding: '4px 0',
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            Talk to a product expert
          </Button>
        </Box>

        {/* Business Hours Description */}
        <Typography variant="body2" sx={{ 
          color: '#4b5563',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          marginBottom: 3
        }}>
          Business Hours give you more control over SLAs in your helpdesk, and when a ticket is due. For example, if your helpdesk works between 9am to 6pm Mon-Fri and a customer logs a ticket at 7pm on Tuesday, the "Due by" timers do not start ticking till Wednesday morning at 9.
        </Typography>

        {/* Holidays Section */}
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          color: '#1a1a1a',
          fontSize: '1rem',
          marginBottom: 2
        }}>
          Holidays
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#4b5563',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          marginBottom: 3
        }}>
          Holidays work exactly like business hours. If your helpdesk works between 9am to 6pm Mon-Fri and a customer sends a medium priority ticket at 6pm on Friday with a resolution time of 24 hours, then the ticket Due By time is set as 9am on Tuesday.(not 6pm on Sat)
        </Typography>

        {/* Multiple Business Hours Section */}
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          color: '#1a1a1a',
          fontSize: '1rem',
          marginBottom: 2
        }}>
          Multiple Business Hours
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#4b5563',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          marginBottom: 1
        }}>
          You can also create multiple sets of business hours and holidays, and apply them for specific groups. If you have one support team working on PST and another on GMT, you can let each group have its own set of business hours and holidays.{' '}
          <Link 
            href="#" 
            sx={{ 
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Learn more
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default BusinessHoursUI;