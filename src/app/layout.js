'use client';

import './globals.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#059669',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Sidebar 
              isCollapsed={sidebarCollapsed} 
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
            />
            
            {/* Main content area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Navbar */}
              <Navbar />
              
              {/* Page content */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  p: 3,
                  backgroundColor: 'background.default',
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}