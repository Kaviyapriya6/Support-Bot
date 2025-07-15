'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Link,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  Analytics as AnalyticsIcon,
  Group as GroupIcon,
  SmartToy as SmartToyIcon,
  TrendingUp as TrendingUpIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

const AgentRolesUI = () => {
  const [roles] = useState([
    {
      id: 1,
      name: 'Account Administrator',
      description: 'Has complete control over the help desk and the organisation including access to Account or Billing related information, and receives invoices.',
      assignedAgents: 1,
      addOnAccess: '--',
      icon: <AdminIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 2,
      name: 'Administrator',
      description: 'Can configure all features through the Admin tab, but is restricted from viewing Account or Billing related information.',
      assignedAgents: 0,
      addOnAccess: '--',
      icon: <SettingsIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 3,
      name: 'Supervisor',
      description: 'Can perform all agent related activities, access reports and see unresolved tickets dashboard.',
      assignedAgents: 0,
      addOnAccess: '--',
      icon: <VisibilityIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 4,
      name: 'Agent',
      description: 'Can log, view, reply, update and resolve tickets and manage contacts.',
      assignedAgents: 1,
      addOnAccess: '--',
      icon: <PersonIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 5,
      name: 'Ticket Collaborator',
      description: 'Ticket collaborators can get assigned/tagged to tickets, add/edit private notes within their scope, update ticket status, modify their time entry, view customer information related to the ticket.',
      assignedAgents: 0,
      addOnAccess: '--',
      icon: <GroupIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 6,
      name: 'Analytics Collaborator',
      description: 'Analytics collaborators can view reports in the Analytics module.',
      assignedAgents: 0,
      addOnAccess: '--',
      icon: <AnalyticsIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 7,
      name: 'Freddy AI Copilot User',
      description: 'Can access the Freddy AI Copilot license features and thereby consuming a license',
      assignedAgents: 1,
      addOnAccess: 'Freddy AI Copilot',
      icon: <SmartToyIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 8,
      name: 'Freddy AI Insights User',
      description: 'Can access the Freddy AI Insights features',
      assignedAgents: 1,
      addOnAccess: 'Freddy AI Insights',
      icon: <TrendingUpIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    },
    {
      id: 9,
      name: 'administrator',
      description: 'zxfffffffffff',
      assignedAgents: 0,
      addOnAccess: '--',
      icon: <AdminIcon sx={{ color: '#2196f3', fontSize: 16 }} />
    }
  ]);

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        padding: 3,
        paddingLeft: 4,
        paddingRight: 4
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 3
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 500,
            color: '#333',
            fontSize: '1.5rem'
          }}>
            Agent Roles
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              textTransform: 'none',
              fontWeight: 500,
              paddingX: 2,
              paddingY: 1,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            New Role
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: '4px',
          border: '1px solid #e0e0e0'
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: '#666',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  Role
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: '#666',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  Assigned agents
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: '#666',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  Add-on access
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, index) => (
                <TableRow 
                  key={role.id}
                  sx={{ 
                    '&:hover': { backgroundColor: '#f9f9f9' },
                    borderBottom: index < roles.length - 1 ? '1px solid #e0e0e0' : 'none'
                  }}
                >
                  <TableCell sx={{ 
                    padding: '16px',
                    borderBottom: 'none',
                    verticalAlign: 'top'
                  }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        {role.icon}
                        <Link
                          href="#"
                          sx={{
                            color: '#1976d2',
                            textDecoration: 'none',
                            fontWeight: 500,
                            marginLeft: 1,
                            fontSize: '0.875rem',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {role.name}
                        </Link>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          fontSize: '0.813rem',
                          lineHeight: 1.4,
                          marginLeft: 3
                        }}
                      >
                        {role.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    padding: '16px',
                    borderBottom: 'none',
                    verticalAlign: 'top'
                  }}>
                    {role.assignedAgents > 0 ? (
                      <Link
                        href="#"
                        sx={{
                          color: '#1976d2',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {role.assignedAgents} Agent{role.assignedAgents !== 1 ? 's' : ''}
                      </Link>
                    ) : (
                      <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                        No Agent
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ 
                    padding: '16px',
                    borderBottom: 'none',
                    verticalAlign: 'top'
                  }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      {role.addOnAccess}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {/* Last row with edit/delete buttons */}
              <TableRow sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell sx={{ 
                  padding: '16px',
                  borderBottom: 'none',
                  verticalAlign: 'top'
                }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                      <AdminIcon sx={{ color: '#2196f3', fontSize: 16 }} />
                      <Link
                        href="#"
                        sx={{
                          color: '#1976d2',
                          textDecoration: 'none',
                          fontWeight: 500,
                          marginLeft: 1,
                          fontSize: '0.875rem',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        administrator
                      </Link>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontSize: '0.813rem',
                        lineHeight: 1.4,
                        marginLeft: 3
                      }}
                    >
                      zxfffffffffff
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ 
                  padding: '16px',
                  borderBottom: 'none',
                  verticalAlign: 'top'
                }}>
                  <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                    No Agent
                  </Typography>
                </TableCell>
                <TableCell sx={{ 
                  padding: '16px',
                  borderBottom: 'none',
                  verticalAlign: 'top',
                  position: 'relative'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem', marginRight: 2 }}>
                      --
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          minWidth: 'auto',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          color: '#666',
                          borderColor: '#ddd',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        Edit
                      </Button>
                      <IconButton
                        size="small"
                        sx={{
                          color: '#666',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Right Sidebar */}
      <Box sx={{ 
        width: 320,
        backgroundColor: 'white',
        padding: 3,
        borderLeft: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 500,
          color: '#333',
          fontSize: '1rem',
          marginBottom: 2
        }}>
          Understanding Roles
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#666',
          fontSize: '0.813rem',
          lineHeight: 1.5,
          marginBottom: 3
        }}>
          Roles allow you to create and edit access permissions for agents. You can create new roles, specify what actions agents with these roles can perform within your help desk, and assign the role to agents.
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#666',
          fontSize: '0.813rem',
          lineHeight: 1.5,
          marginBottom: 3
        }}>
          For example, you can create a role for your Support Co-ordinators, allowing them to update fields and assign tickets, and even add notes internally, but not reply to customers.
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#666',
          fontSize: '0.813rem',
          lineHeight: 1.5,
          marginBottom: 3
        }}>
          Once you create and save a new Role you will be able to assign it to agents when you create or edit their profile by clicking on the Agents icon under the admin tab.
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#666',
          fontSize: '0.813rem',
          lineHeight: 1.5,
          marginBottom: 3
        }}>
          You can have up to 100 roles in your account.
        </Typography>
        
        <Typography variant="subtitle2" sx={{ 
          fontWeight: 600,
          color: '#333',
          fontSize: '0.875rem',
          marginBottom: 2
        }}>
          Admin Privileges
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#666',
          fontSize: '0.813rem',
          lineHeight: 1.5,
          marginBottom: 2
        }}>
          You can nominate whether you want an agent to have access to settings under the Admin tab. Agents with admin access can be Operation Agents with limited access, or Super Admins with the ability to edit all configurations. You can have as many Super Admins with the ability to view and modify your billing details, or as few as one.
        </Typography>
        
        <Link
          href="#"
          sx={{
            color: '#1976d2',
            textDecoration: 'none',
            fontSize: '0.813rem',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Learn more about roles and privileges
        </Link>
      </Box>
    </Box>
  );
};

export default AgentRolesUI;