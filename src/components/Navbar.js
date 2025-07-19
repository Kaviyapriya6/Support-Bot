'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Avatar,
  Chip
} from '@mui/material';
import {
  Search,
  Notifications,
  Add,
  Description,
  Settings,
  AccountCircle,
  ExpandMore,ConfirmationNumber,
  Email,
  Person,
  Business,
  PersonOutline,
  Logout
} from '@mui/icons-material';

const Navbar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const router = useRouter();

  const [newMenuAnchor, setNewMenuAnchor] = useState(null);
const handleNewClick = (event) => setNewMenuAnchor(event.currentTarget);
const handleNewClose = () => setNewMenuAnchor(null);

  // Function to get page title based on pathname
  const getPageTitle = () => {
    const pageTitles = {
      '/dashboard': 'Dashboard',
      '/contacts': 'Contacts',
      '/contacts/create': 'Create Contact',
      '/tickets': 'Tickets',
      '/tickets/create': 'Create Ticket',
      '/agents': 'Agents',
      '/agents/create': 'Create Agent',
      '/groups': 'Groups',
      '/groups/create': 'Create Group',
      '/company': 'Companies',
      '/company/create': 'Create Company',
  
      '/admin': 'Admin',
      '/apps': 'Apps',
    };
    
    // Handle dynamic routes like edit and view pages
    if (pathname.includes('/contacts/edit/')) return 'Edit Contact';
    if (pathname.includes('/tickets/edit/')) return 'Edit Ticket';
    if (pathname.includes('/tickets/view/')) return 'View Ticket';
    if (pathname.includes('/agents/edit/')) return 'Edit Agent';
    if (pathname.includes('/groups/edit/')) return 'Edit Group';
    if (pathname.includes('/company/edit/')) return 'Edit Company';
    
    return pageTitles[pathname] || 'Dashboard';
  };

  const handleRecommendedClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        color: '#1f2937',
        height: '64px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: '100%' }}>
        {/* Left side - Page title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#1f2937',
            }}
          >
            {getPageTitle()}
          </Typography>
        </Box>

        {/* Right side - Actions and user menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Trial notice */}
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Your trial ends in{' '}
            <Typography component="span" sx={{ fontWeight: 600 }}>
              14 days
            </Typography>
          </Typography>

          {/* Subscribe button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2563eb',
              '&:hover': { backgroundColor: '#1d4ed8' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Subscribe
          </Button>

          {/* Recommended features */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="text"
              endIcon={<ExpandMore />}
              onClick={handleRecommendedClick}
              sx={{
                color: '#6b7280',
                textTransform: 'none',
                '&:hover': { color: '#1f2937' },
              }}
            >
              Recommended features
              <Badge
                badgeContent={1}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -8,
                    top: -8,
                  },
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { minWidth: 200 },
              }}
            >
              <MenuItem onClick={handleClose}>Feature 1</MenuItem>
              <MenuItem onClick={handleClose}>Feature 2</MenuItem>
            </Menu>
          </Box>

          {/* New button */}
         
          <Box sx={{ position: 'relative' }}>
  <Button
    variant="contained"
    startIcon={<Add />}
    endIcon={<ExpandMore />}
    onClick={handleNewClick}
    sx={{
      backgroundColor: '#059669',
      '&:hover': { backgroundColor: '#047857' },
      textTransform: 'none',
      fontWeight: 600,
    }}
  >
    New
  </Button>
   <Menu
    anchorEl={newMenuAnchor}
    open={Boolean(newMenuAnchor)}
    onClose={handleNewClose}
    PaperProps={{ sx: { minWidth: 180 } }}
  >
    <MenuItem onClick={() => { handleNewClose(); router.push('/tickets/create'); }}>
      <ConfirmationNumber fontSize="small" sx={{ mr: 1 }} /> Ticket
    </MenuItem>
    <MenuItem onClick={() => { handleNewClose(); router.push('/Email/create'); }}>
      <Email fontSize="small" sx={{ mr: 1 }} /> Email
    </MenuItem>
    <MenuItem onClick={() => { handleNewClose(); router.push('/contacts/create'); }}>
      <Person fontSize="small" sx={{ mr: 1 }} /> Contact
    </MenuItem>
    <MenuItem onClick={() => { handleNewClose(); router.push('/company/create'); }}>
      <Business fontSize="small" sx={{ mr: 1 }} /> Company
    </MenuItem>
    <MenuItem onClick={() => { handleNewClose(); router.push('/agents/create'); }}>
      <PersonOutline fontSize="small" sx={{ mr: 1 }} /> Agent
    </MenuItem>
  </Menu>
</Box>
        

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f9fafb',
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                },
              },
            }}
          />

          {/* Notifications */}
          <IconButton
            sx={{
              color: '#6b7280',
              '&:hover': { color: '#1f2937' },
            }}
          >
            <Badge badgeContent={1} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Additional action buttons */}
          <IconButton
            sx={{
              color: '#6b7280',
              '&:hover': { color: '#1f2937' },
            }}
          >
            <Description />
          </IconButton>

          <IconButton
            sx={{
              color: '#6b7280',
              '&:hover': { color: '#1f2937' },
            }}
          >
            <Settings />
          </IconButton>

          {/* User menu */}
          <Box sx={{ position: 'relative' }}>
            <IconButton onClick={handleUserMenuClick}>
              <Avatar
                sx={{
                  bgcolor: '#f97316',
                  width: 32,
                  height: 32,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleClose}
              PaperProps={{
                sx: { minWidth: 180 },
              }}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircle sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Settings sx={{ mr: 1 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Sign out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;