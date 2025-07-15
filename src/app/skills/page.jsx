'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  Typography,
  Link,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(3)
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3)
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 300,
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  height: 'fit-content'
}));

const CreateSkillButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  textTransform: 'none',
  fontSize: '14px',
  padding: '6px 16px',
  '&:hover': {
    backgroundColor: '#1565c0'
  }
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  color: '#666'
}));

const EmptyStateIcon = styled(Box)(({ theme }) => ({
  width: 120,
  height: 100,
  backgroundColor: '#f0f0f0',
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  position: 'relative'
}));

const IconCircle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: '#e0e0e0',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute'
}));

const PlusIcon = styled(Box)(({ theme }) => ({
  width: 16,
  height: 16,
  backgroundColor: '#1976d2',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  position: 'absolute',
  bottom: 8,
  right: 8
}));

const SidebarSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#333'
}));

const SidebarContent = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.5,
  color: '#666',
  marginBottom: theme.spacing(1)
}));

const VideoLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  color: '#1976d2',
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const SubSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
  marginBottom: theme.spacing(1)
}));

const CollapseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: '#666'
}));

export default function SkillsManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCreateSkill = () => {
    // Handle create skill logic
    console.log('Create skill clicked');
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledContainer maxWidth={false}>
      <MainContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
            Skills
          </Typography>
          <CreateSkillButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateSkill}
          >
            Create skill
          </CreateSkillButton>
        </Box>
        
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: '#666',
              '&.Mui-selected': {
                color: '#1976d2'
              }
            }
          }}
        >
          <Tab label="Skill List" />
          <Tab label="Agent List" />
        </Tabs>

        <EmptyStateContainer>
          <EmptyStateIcon>
            <IconCircle sx={{ top: 20, left: 30 }}>
              <PersonIcon sx={{ fontSize: 20, color: '#999' }} />
            </IconCircle>
            <IconCircle sx={{ top: 35, right: 25 }}>
              <PersonIcon sx={{ fontSize: 20, color: '#999' }} />
            </IconCircle>
            <PlusIcon>
              +
            </PlusIcon>
          </EmptyStateIcon>
          
          <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
            You haven't created a skill yet!
          </Typography>
          
          <Button
            variant="text"
            sx={{ 
              color: '#1976d2', 
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500
            }}
            onClick={handleCreateSkill}
          >
            Create Skills
          </Button>
        </EmptyStateContainer>
      </MainContent>

      <Sidebar sx={{ position: 'relative' }}>
        <CollapseButton onClick={toggleCollapse}>
          {collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </CollapseButton>
        
        {!collapsed && (
          <>
            <SidebarSection>
              <SidebarTitle>Skills</SidebarTitle>
              <SidebarContent>
                With skill-based routing, tickets get automatically assigned to the agent that's best skilled to handle them. In addition, you can ensure that requests with certain skills are always prioritized for routing over the rest.
              </SidebarContent>
              <VideoLink href="#">
                Watch video on how it works
              </VideoLink>
            </SidebarSection>

            <SidebarSection>
              <SubSection>
                <SubTitle>Creating Skills</SubTitle>
                <SidebarContent>
                  Adding a skill to a request: Skill rules determine the skill that should be associated with a ticket. As an example, you can create a rule that assigns the skill "French" to requests from French-speaking customers. The first matching skill in the list is applied to the ticket.
                </SidebarContent>
              </SubSection>

              <SubSection>
                <SubTitle>Associating agents to skills:</SubTitle>
                <SidebarContent>
                  Agents can be associated with a list of skills, in the right order, based on their proficiency. When a new ticket is created, agents with the first skill set that of the ticket are considered for assignment. If these agents are unavailable, agents with the second skill that matches that of the ticket are considered for assignment. This continues until the request is assigned to an agent with a matching skill.
                </SidebarContent>
              </SubSection>

              <SubSection>
                <SubTitle>Prioritizing tickets</SubTitle>
                <SidebarContent>
                  Tickets with the first matching skill of an agent are always prioritized for routing over the rest of the unassigned tickets in the queue. For example, say an agent's skill is "VIP customers". Every time the agent resolves a request, requests with the skill "VIP customers" are assigned, even if there are older tickets with different skills in the queue.
                </SidebarContent>
              </SubSection>
            </SidebarSection>

            <Box sx={{ fontSize: '14px', color: '#1976d2', mt: 2 }}>
              <Link href="#" sx={{ textDecoration: 'none', color: 'inherit' }}>
                Learn more about skill-based routing
              </Link>
            </Box>
          </>
        )}
      </Sidebar>
    </StyledContainer>
  );
}