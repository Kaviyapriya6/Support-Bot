'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Collapse
} from '@mui/material';
import {
  Dashboard,
  People,
  ConfirmationNumber,
  Assessment,
  Settings,
  SmartToy,
  MenuBook,
  AdminPanelSettings,
  Apps,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', icon: <Dashboard />, label: 'Dashboard' },
    { href: '/contacts', icon: <People />, label: 'Contacts' },
    { href: '/company', icon: <SmartToy />, label: 'Company' },
    { href: '/tickets', icon: <ConfirmationNumber />, label: 'Tickets' },
    // { href: '/reports', icon: <Assessment />, label: 'Reports' },
    // { href: '/settings', icon: <Settings />, label: 'Settings' },
    // { href: '/automation', icon: <SmartToy />, label: 'Automation' },
    { href: '/solutions', icon: <MenuBook />, label: 'Solutions' },
    { href: '/admin', icon: <AdminPanelSettings />, label: 'Admin' },
  ];

  const bottomMenuItems = [
    { href: '/apps', icon: <Apps />, label: 'Apps' },
  ];

  const drawerWidth = isCollapsed ? 64 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e293b',
          color: 'white',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: '#2563eb',
              width: 32,
              height: 32,
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            H
          </Avatar>
          {!isCollapsed && (
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
              Bizdesk
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={onToggle}
          sx={{
            color: '#94a3b8',
            '&:hover': { color: 'white' },
            ...(isCollapsed && { ml: 'auto' })
          }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: '#334155' }} />

      {/* Main Menu */}
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2,
                  py: 1.5,
                  color: pathname === item.href ? 'white' : '#cbd5e1',
                  backgroundColor: pathname === item.href ? '#2563eb' : 'transparent',
                  borderRight: pathname === item.href ? '2px solid #60a5fa' : 'none',
                  '&:hover': {
                    backgroundColor: pathname === item.href ? '#2563eb' : '#334155',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 'auto' : 3,
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ borderColor: '#334155' }} />

      {/* Bottom Menu */}
      <Box sx={{ py: 1 }}>
        <List>
          {bottomMenuItems.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2,
                  py: 1.5,
                  color: pathname === item.href ? 'white' : '#cbd5e1',
                  backgroundColor: pathname === item.href ? '#2563eb' : 'transparent',
                  borderRight: pathname === item.href ? '2px solid #60a5fa' : 'none',
                  '&:hover': {
                    backgroundColor: pathname === item.href ? '#2563eb' : '#334155',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 'auto' : 3,
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;