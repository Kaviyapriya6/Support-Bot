'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Link,
  Fab,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamIcon from '@mui/icons-material/Videocam';
import CoffeeIcon from '@mui/icons-material/Coffee';
import SchoolIcon from '@mui/icons-material/School';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  padding: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(3)
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 350,
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  height: 'fit-content',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2)
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: '#333',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  lineHeight: 1.5,
  marginBottom: theme.spacing(3),
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const NewAgentButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: '4px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '&:hover': {
    backgroundColor: '#1565c0'
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  border: 'none'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f8f9fa'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#666',
  border: 'none',
  padding: '16px 12px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f8f9fa'
  },
  '& td': {
    borderBottom: '1px solid #e0e0e0',
    padding: '16px 12px'
  }
}));

const StatusIcon = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1)
}));

const StatusName = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#333',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const StatusType = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(2),
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const SidebarContent = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#666',
  lineHeight: 1.5,
  marginBottom: theme.spacing(2),
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const LearnMoreLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  color: '#1976d2',
  textDecoration: 'none',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const ChatFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: '#333',
  color: 'white',
  width: 56,
  height: 56,
  '&:hover': {
    backgroundColor: '#555'
  },
  '&::after': {
    content: '"1"',
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: '50%',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  }
}));

export default function AgentStatuses() {
  const [statuses, setStatuses] = useState([
    {
      id: 1,
      name: 'Available',
      type: 'Busy',
      icon: <CheckCircleIcon sx={{ fontSize: 16, color: 'white' }} />,
      iconBg: '#4caf50',
      enabled: false
    },
    {
      id: 2,
      name: 'Unavailable',
      type: 'Away',
      icon: <CancelIcon sx={{ fontSize: 16, color: 'white' }} />,
      iconBg: '#f44336',
      enabled: false
    },
    {
      id: 3,
      name: 'Meeting',
      type: 'Busy',
      icon: <VideocamIcon sx={{ fontSize: 16, color: 'white' }} />,
      iconBg: '#2196f3',
      enabled: true
    },
    {
      id: 4,
      name: 'Break',
      type: 'Away',
      icon: <CoffeeIcon sx={{ fontSize: 16, color: 'white' }} />,
      iconBg: '#8e24aa',
      enabled: true
    },
    {
      id: 5,
      name: 'Training',
      type: 'Busy',
      icon: <SchoolIcon sx={{ fontSize: 16, color: 'white' }} />,
      iconBg: '#ff9800',
      enabled: true
    },
    {
      id: 6,
      name: 'Lunch',
      type: 'Away',
      icon: <RestaurantIcon sx={{ fontSize: 16, color: 'white' }} />,
      iconBg: '#795548',
      enabled: true
    }
  ]);

  const handleToggle = (id) => {
    setStatuses(statuses.map(status => 
      status.id === id ? { ...status, enabled: !status.enabled } : status
    ));
  };

  const handleNewAgentStatus = () => {
    console.log('New agent status clicked');
  };

  const handleChatClick = () => {
    console.log('Chat clicked');
  };

  return (
    <StyledContainer maxWidth={false}>
      <MainContent>
        <Header>
          <Box>
            <Title>Agent statuses</Title>
            <Description>
              With custom statuses, you can get insights into how agents spend their time when they're unavailable to assist new customers. You can <Link href="#" sx={{ color: '#1976d2', textDecoration: 'none' }}>view and update your team's statuses</Link> in real-time using the availability dashboard. <LearnMoreLink href="#">Learn more</LearnMoreLink>
            </Description>
          </Box>
          <NewAgentButton
            variant="contained"
            onClick={handleNewAgentStatus}
          >
            New agent status
          </NewAgentButton>
        </Header>

        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {statuses.map((status) => (
                <StyledTableRow key={status.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StatusIcon sx={{ backgroundColor: status.iconBg }}>
                        {status.icon}
                      </StatusIcon>
                      <StatusName>{status.name}</StatusName>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusType>{status.type}</StatusType>
                  </TableCell>
                  <TableCell align="right">
                    <Switch
                      checked={status.enabled}
                      onChange={() => handleToggle(status.id)}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </MainContent>

      <Sidebar>
        <SidebarTitle>Agent statuses</SidebarTitle>
        <SidebarContent>
          Agent statuses make it easy to understand your team's productivity and to plan your workforce.
        </SidebarContent>
        <SidebarContent>
          Tickets are automatically routed to agents only when their status is "Available". With custom statuses like "meeting", "break", etc. agents can denote why they're unable to handle new tickets.
        </SidebarContent>
        <SidebarContent>
          You can view and update your team's status in real-time using the availability dashboard. With analytics, you can get insights into how long agents are able to take breaks, how long they spend in meetings, etc.
        </SidebarContent>
        <SidebarContent>
          Status types help you get insights into how much time your team spends on work-related tasks and away from work.
        </SidebarContent>
        <LearnMoreLink href="#">Learn more</LearnMoreLink>
      </Sidebar>

      <ChatFab
        onClick={handleChatClick}
        aria-label="chat"
      >
        <ChatIcon />
      </ChatFab>
    </StyledContainer>
  );
}