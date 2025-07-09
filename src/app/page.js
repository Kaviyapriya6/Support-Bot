// 'use client'
// import React from 'react';
// import Link from 'next/link'

// const BizBooksDashboard = () => {
//   // SVG Icons
//   const SettingsIcon = () => (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <circle cx="12" cy="12" r="3"/>
//       <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
//     </svg>
//   );

//   const BellIcon = () => (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
//       <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
//     </svg>
//   );

//   const UserIcon = () => (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//       <circle cx="12" cy="7" r="4"/>
//     </svg>
//   );

//   const ShoppingCartIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <circle cx="9" cy="21" r="1"/>
//       <circle cx="20" cy="21" r="1"/>
//       <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
//     </svg>
//   );

//   const PackageIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
//       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
//       <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
//       <line x1="12" y1="22.08" x2="12" y2="12"/>
//     </svg>
//   );

//   const CreditCardIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
//       <line x1="1" y1="10" x2="23" y2="10"/>
//     </svg>
//   );

//   const ClockIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <circle cx="12" cy="12" r="10"/>
//       <polyline points="12,6 12,12 16,14"/>
//     </svg>
//   );

//   const TicketIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/>
//       <path d="M13 5v2"/>
//       <path d="M13 17v2"/>
//       <path d="M13 11v2"/>
//     </svg>
//   );

//   return (
//     <div className="dashboard-container">
//       <style jsx>{`
//         .dashboard-container {
//           display: flex;
//           height: 100vh;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           background: #f5f5f5;
//         }

//         .sidebar {
//           width: 200px;
//           background: #1a1a1a;
//           color: white;
//           padding: 0;
//           display: flex;
//           flex-direction: column;
//         }

//         .logo {
//           padding: 20px;
//           font-size: 18px;
//           font-weight: bold;
//           letter-spacing: 1px;
//           border-bottom: 1px solid #333;
//         }

//         .nav-menu {
//           flex: 1;
//           padding: 20px 0;
//         }

//         .nav-item {
//           display: flex;
//           align-items: center;
//           padding: 15px 20px;
//           color: #ccc;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           letter-spacing: 0.5px;
//           transition: all 0.2s ease;
//           cursor: pointer;
//         }

//         .nav-item:hover {
//           background: #2a2a2a;
//           color: white;
//         }

//         .nav-item svg {
//           margin-right: 12px;
//           width: 16px;
//           height: 16px;
//         }

//         .main-content {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         .header {
//           background: white;
//           padding: 15px 30px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }

//         .search-container {
//           position: relative;
//           flex: 1;
//           max-width: 400px;
//           margin: 0 40px;
//         }

//         .search-input {
//           width: 100%;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 25px;
//           background: #f8f9fa;
//           font-size: 14px;
//           color: #666;
//           outline: none;
//           transition: all 0.2s ease;
//         }

//         .search-input:focus {
//           background: #e9ecef;
//           box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
//         }

//         .header-icons {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//         }

//         .icon-button {
//           width: 40px;
//           height: 40px;
//           border: none;
//           background: #f8f9fa;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         .icon-button:hover {
//           background: #e9ecef;
//         }

//         .icon-button svg {
//           width: 18px;
//           height: 18px;
//           color: #666;
//         }

//         .content-area {
//           flex: 1;
//           background: #f5f5f5;
//           padding: 30px;
//         }

//         .content-placeholder {
//           background: white;
//           border-radius: 8px;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #999;
//           font-size: 16px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//         }

//         @media (max-width: 768px) {
//           .sidebar {
//             width: 180px;
//           }
          
//           .header {
//             padding: 15px 20px;
//           }
          
//           .search-container {
//             margin: 0 20px;
//           }
          
//           .content-area {
//             padding: 20px;
//           }
//         }
//       `}</style>

//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">
//           BIZBOOKS
//         </div>
//         <nav className="nav-menu">
//           <div className="nav-item">
//             <ShoppingCartIcon />
//             SALES ORDER
//           </div>
//           <div className="nav-item">
//             <PackageIcon />
//             PURCHASE ORDER
//           </div>
//           <div className="nav-item">
//             <PackageIcon />
//             ITEMS
//           </div>
//           <div className="nav-item">
//             <CreditCardIcon />
//             BANKING
//           </div>
//           <div className="nav-item">
//             <ClockIcon />
//             TIME TRACKING
//           </div>
//           <div className="nav-item">
//             <TicketIcon />
//             <Link href="/tickets">TICKETS</Link>
//           </div>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="header">
//           <div className="search-container">
//             <input 
//               type="text" 
//               placeholder="search customers" 
//               className="search-input"
//             />
//           </div>
//           <div className="header-icons">
//             <button className="icon-button">
//               <BellIcon />
//             </button>
//             <button className="icon-button">
//               <SettingsIcon />
//             </button>
//             <button className="icon-button">
//               <UserIcon />
//             </button>
//           </div>
//         </header>

//         {/* Content Area */}
//         <div className="content-area">
//           <div className="content-placeholder">
//             Content area - ready for your dashboard components
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BizBooksDashboard;
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