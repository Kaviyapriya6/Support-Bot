'use client'
import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatIcon from '@mui/icons-material/Chat';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3)
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  maxWidth: 500,
  width: '100%'
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  width: 300,
  height: 250,
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
}));

const IllustrationImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 600,
  color: '#2c3e50',
  marginBottom: theme.spacing(2),
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#6c757d',
  marginBottom: theme.spacing(4),
  lineHeight: 1.5,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2c3e50',
  color: 'white',
  textTransform: 'uppercase',
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 32px',
  borderRadius: '4px',
  letterSpacing: '0.5px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '&:hover': {
    backgroundColor: '#34495e',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(44, 62, 80, 0.3)'
  },
  transition: 'all 0.3s ease'
}));

const ChatFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: '#2c3e50',
  color: 'white',
  width: 56,
  height: 56,
  '&:hover': {
    backgroundColor: '#34495e'
  },
  '&::after': {
    content: '"1"',
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  }
}));

export default function AgentShifts() {
  const handleCreateShifts = () => {
    // Handle create shifts logic
    console.log('Create shifts clicked');
  };

  const handleChatClick = () => {
    // Handle chat click logic
    console.log('Chat clicked');
  };

  return (
    <StyledContainer maxWidth={false}>
      <EmptyStateContainer>
        <IllustrationContainer>
          <IllustrationImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Agent working at desk"
            loading="lazy"
          />
        </IllustrationContainer>
        
        <Title>Agent Shifts</Title>
        
        <Subtitle>
          Take your first step away from those excel sheets!
        </Subtitle>
        
        <CreateButton
          variant="contained"
          onClick={handleCreateShifts}
          disableElevation
        >
          Create Shifts
        </CreateButton>
      </EmptyStateContainer>

      <ChatFab
        onClick={handleChatClick}
        aria-label="chat"
      >
        <ChatIcon />
      </ChatFab>
    </StyledContainer>
  );
}