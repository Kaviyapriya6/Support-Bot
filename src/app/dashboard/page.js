'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Chip, Paper, Stack, Card, CardContent,
  LinearProgress, IconButton, List, ListItem, ListItemText, ListItemIcon,
  Checkbox, Avatar, Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Person as PersonIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  AccessTime as AccessTimeIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentNeutral as SentimentNeutralIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  Notifications as NotificationsIcon,
  Groups as GroupsIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/tickets');
      if (!res.ok) throw new Error('Failed to fetch tickets');
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTicketStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const stats = {
      unresolved: tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length,
      overdue: tickets.filter(t => {
        const dueDate = new Date(t.dueDate);
        return dueDate < now && t.status !== 'Resolved' && t.status !== 'Closed';
      }).length,
      dueToday: tickets.filter(t => {
        const dueDate = new Date(t.dueDate);
        return dueDate >= today && dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
      }).length,
      open: tickets.filter(t => t.status === 'Open').length,
      onHold: tickets.filter(t => t.status === 'On Hold').length,
      unassigned: tickets.filter(t => !t.assignedTo).length,
      resolved: tickets.filter(t => t.status === 'Resolved').length,
      received: tickets.length
    };
    return stats;
  };

  const getTrendsData = () => {
    // Generate sample trend data (replace with actual data processing)
    return [
      { hour: '0', value: 12 },
      { hour: '1', value: 8 },
      { hour: '2', value: 15 },
      { hour: '3', value: 10 },
      { hour: '4', value: 18 },
      { hour: '5', value: 22 },
      { hour: '6', value: 25 },
      { hour: '7', value: 20 },
      { hour: '8', value: 28 },
      { hour: '9', value: 30 },
      { hour: '10', value: 32 },
      { hour: '11', value: 35 },
      { hour: '12', value: 40 },
      { hour: '13', value: 38 },
      { hour: '14', value: 42 },
      { hour: '15', value: 45 },
      { hour: '16', value: 48 },
      { hour: '17', value: 50 },
      { hour: '18', value: 46 },
      { hour: '19', value: 43 },
      { hour: '20', value: 40 },
      { hour: '21', value: 35 },
      { hour: '22', value: 30 },
      { hour: '23', value: 25 }
    ];
  };

  const getUnresolvedTicketsBreakdown = () => {
    const groups = [
      { name: 'Customer support', count: 32, color: '#1976d2' },
      { name: 'Loyalty programs', count: 8, color: '#388e3c' },
      { name: 'Vendor management', count: 12, color: '#f57c00' },
      { name: 'Billing', count: 3, color: '#d32f2f' }
    ];
    return groups;
  };

  const stats = getTicketStats();
  const trendsData = getTrendsData();
  const unresolvedBreakdown = getUnresolvedTicketsBreakdown();

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f8fafc',
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <LinearProgress sx={{ width: '100%', maxWidth: 400 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8fafc',
      p: 3
    }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* Header */}
        

        {/* Main Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={3}>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
                  Unresolved
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  {stats.unresolved}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
                  Overdue
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                  {stats.overdue}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
                  Due today
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#f57c00' }}>
                  {stats.dueToday}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
                  Open
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  {stats.open}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
                  On hold
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                  {stats.onHold}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              flex: 1, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 1 }}>
                  Unassigned
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#795548' }}>
                  {stats.unassigned}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Charts and Details Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3, mb: 4 }}>
          {/* Today's Trends Chart */}
          <Card sx={{ 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                Today's trends
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                1st May 2018, 03:00 PM
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsData}>
                    <XAxis 
                      dataKey="hour" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1976d2" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card sx={{ 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                    Resolved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {stats.resolved}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                    Received
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {stats.received}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                    Average first response time
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    12m
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                    Average response time
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    24m 12s
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                    Resolution within SLA
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    91%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Bottom Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
          {/* Unresolved Tickets */}
          <Card sx={{ 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                Unresolved tickets
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Across helpdesk
              </Typography>
              
              <Stack spacing={2}>
                {unresolvedBreakdown.map((group, index) => (
                  <Box key={index}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                        {group.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {group.count}
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={(group.count / 55) * 100} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: group.color,
                          borderRadius: 3
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
              
              <Button 
                variant="text" 
                size="small" 
                sx={{ mt: 2, color: '#1976d2', fontWeight: 500 }}
              >
                View details
              </Button>
            </CardContent>
          </Card>

          {/* Customer Satisfaction */}
          <Card sx={{ 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                Customer satisfaction
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Across helpdesk this month
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                    Responses received
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    320
                  </Typography>
                </Box>
                
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <SentimentSatisfiedIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                      Positive
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50' }}>
                    90%
                  </Typography>
                </Box>
                
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <SentimentNeutralIcon sx={{ color: '#ff9800', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                      Neutral
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff9800' }}>
                    6%
                  </Typography>
                </Box>
                
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <SentimentDissatisfiedIcon sx={{ color: '#f44336', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                      Negative
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#f44336' }}>
                    4%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* To-do */}
          <Card sx={{ 
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                To-do (2)
              </Typography>
              <Button 
                variant="text" 
                size="small" 
                startIcon={<AddIcon />}
                sx={{ color: '#1976d2', fontWeight: 500, mb: 2, p: 0 }}
              >
                Add a to-do
              </Button>
              
              <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Checkbox size="small" />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, mb: 1 }}>
                        Followup with customer about Upgrade
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <NotificationsIcon sx={{ color: '#64748b', fontSize: 14 }} />
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          Set two factor authentication by google authenticator
                        </Typography>
                      </Stack>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        IN 4 DAYS
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Checkbox size="small" />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500, mb: 1 }}>
                        Billing reminder
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <GroupsIcon sx={{ color: '#64748b', fontSize: 14 }} />
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          Ticket Sharing between groups
                        </Typography>
                      </Stack>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        IN 6 DAYS
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}