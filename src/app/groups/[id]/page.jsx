'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Person,
  Email,
  Business,
  Schedule,
  Group as GroupIcon,
  Settings
} from '@mui/icons-material';

export default function GroupDetailPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.id;
  
  const [group, setGroup] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGroupDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch group details
      const groupRes = await fetch(`/api/groups/${groupId}`);
      if (!groupRes.ok) throw new Error('Failed to fetch group details');
      const groupData = await groupRes.json();
      setGroup(groupData.data || groupData);
      
      // Fetch agents in this group
      const agentsRes = await fetch('/api/agents');
      if (!agentsRes.ok) throw new Error('Failed to fetch agents');
      const agentsData = await agentsRes.json();
      
      // Filter agents that belong to this group
      const allAgents = agentsData.data || agentsData;
      const groupAgents = allAgents.filter(agent => 
        agent.groups && agent.groups.includes(groupData.data?.name || groupData.name)
      );
      setAgents(groupAgents);
      
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  const handleEditGroup = () => {
    router.push(`/groups/edit/${groupId}`);
  };

  const handleEditAgent = (agentId) => {
    router.push(`/agents/edit/${agentId}`);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">
          Loading group details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => router.push('/groups')}
          startIcon={<ArrowBack />}
        >
          Back to Groups
        </Button>
      </Box>
    );
  }

  if (!group) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Group not found
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => router.push('/groups')}
          startIcon={<ArrowBack />}
        >
          Back to Groups
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/groups')}
          >
            Back to Groups
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {group.name}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={handleEditGroup}
        >
          Edit Group
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Group Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Group Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {group.name}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Description
              </Typography>
              <Typography variant="body1">
                {group.description || 'No description provided'}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Business Hours
              </Typography>
              <Typography variant="body1">
                {group.businessHours || 'Not specified'}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Active Agents
              </Typography>
              <Chip 
                label={agents.length}
                color={agents.length > 0 ? 'primary' : 'default'}
                variant="outlined"
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Created Date
              </Typography>
              <Typography variant="body1">
                {group.createdAt ? new Date(group.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Agents List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Agents in this Group ({agents.length})
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => router.push('/agents/create')}
              >
                Add Agent
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {agents.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Person sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  No agents in this group
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add agents to this group to see them here.
                </Typography>
              </Box>
            ) : (
              <List>
                {agents.map((agent, index) => (
                  <ListItem
                    key={agent._id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={agent.profileImage}>
                        {agent.email?.charAt(0).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {agent.email}
                          </Typography>
                          <Chip
                            label={agent.agentType}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {agent.workType === 'fulltime' ? 'Full Time' : 'Occasional'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {agent.language}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {agent.timezone}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleEditAgent(agent._id)}
                        title="Edit Agent"
                      >
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
