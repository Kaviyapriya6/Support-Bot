"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching tickets data
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Simulate API call - replace with actual API call
        const mockTickets = [
          { _id: '1', ticketId: 'TKT-001', status: 'Open', priority: 'High', issueType: 'Technical', createdAt: '2024-01-15' },
          { _id: '2', ticketId: 'TKT-002', status: 'In Progress', priority: 'Medium', issueType: 'Billing', createdAt: '2024-01-14' },
          { _id: '3', ticketId: 'TKT-003', status: 'Resolved', priority: 'Low', issueType: 'General', createdAt: '2024-01-13' },
          { _id: '4', ticketId: 'TKT-004', status: 'Open', priority: 'High', issueType: 'Technical', createdAt: '2024-01-12' },
          { _id: '5', ticketId: 'TKT-005', status: 'Closed', priority: 'Medium', issueType: 'Support', createdAt: '2024-01-11' },
          { _id: '6', ticketId: 'TKT-006', status: 'In Progress', priority: 'High', issueType: 'Billing', createdAt: '2024-01-10' },
          { _id: '7', ticketId: 'TKT-007', status: 'Open', priority: 'Low', issueType: 'General', createdAt: '2024-01-09' },
          { _id: '8', ticketId: 'TKT-008', status: 'Resolved', priority: 'Medium', issueType: 'Technical', createdAt: '2024-01-08' },
        ];
        setTickets(mockTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Calculate ticket statistics
  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
      resolved: tickets.filter(t => t.status === 'Resolved').length,
      closed: tickets.filter(t => t.status === 'Closed').length,
      highPriority: tickets.filter(t => t.priority === 'High').length,
      mediumPriority: tickets.filter(t => t.priority === 'Medium').length,
      lowPriority: tickets.filter(t => t.priority === 'Low').length,
    };
    return stats;
  };

  const stats = getTicketStats();

  // Sample trend data for the last 7 days
  const trendData = [
    { day: 'Mon', created: 12, resolved: 8 },
    { day: 'Tue', created: 15, resolved: 10 },
    { day: 'Wed', created: 8, resolved: 12 },
    { day: 'Thu', created: 20, resolved: 15 },
    { day: 'Fri', created: 18, resolved: 14 },
    { day: 'Sat', created: 6, resolved: 8 },
    { day: 'Sun', created: 10, resolved: 12 },
  ];

  // Priority distribution data
  const priorityData = [
    { name: 'High', value: stats.highPriority, color: '#ef4444' },
    { name: 'Medium', value: stats.mediumPriority, color: '#f59e0b' },
    { name: 'Low', value: stats.lowPriority, color: '#10b981' },
  ];

  // Issue type distribution
  const issueTypeData = [
    { name: 'Technical', value: tickets.filter(t => t.issueType === 'Technical').length },
    { name: 'Billing', value: tickets.filter(t => t.issueType === 'Billing').length },
    { name: 'General', value: tickets.filter(t => t.issueType === 'General').length },
    { name: 'Support', value: tickets.filter(t => t.issueType === 'Support').length },
  ];

  const StatCard = ({ title, value, color = '#1976d2', subtitle, icon }) => (
    <div style={styles.statCard}>
      <div style={styles.statHeader}>
        <div style={styles.statIcon(color)}>
          {icon}
        </div>
        <div style={styles.statInfo}>
          <div style={styles.statTitle}>{title}</div>
          <div style={{...styles.statValue, color}}>{value}</div>
          {subtitle && <div style={styles.statSubtitle}>{subtitle}</div>}
        </div>
      </div>
    </div>
  );

  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    header: {
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    headerIcon: {
      backgroundColor: '#3b82f6',
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '700',
      margin: 0
    },
    headerSubtitle: {
      fontSize: '14px',
      color: '#cbd5e1',
      marginTop: '4px'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    mainContent: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    statIcon: (color) => ({
      width: '56px',
      height: '56px',
      backgroundColor: color + '15',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color
    }),
    statInfo: {
      flex: 1
    },
    statTitle: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500',
      marginBottom: '8px'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '1'
    },
    statSubtitle: {
      fontSize: '12px',
      color: '#94a3b8',
      marginTop: '4px'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      marginBottom: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '8px'
    },
    cardSubtitle: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '20px'
    },
    chartContainer: {
      height: '300px',
      width: '100%'
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    pieChartContainer: {
      height: '200px',
      width: '100%'
    },
    legend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '16px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    legendColor: (color) => ({
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: color
    }),
    legendText: {
      fontSize: '14px',
      color: '#64748b'
    },
    quickStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '20px'
    },
    quickStatItem: {
      textAlign: 'center',
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px'
    },
    quickStatValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b'
    },
    quickStatLabel: {
      fontSize: '12px',
      color: '#64748b',
      marginTop: '4px'
    },
    recentTickets: {
      maxHeight: '300px',
      overflowY: 'auto'
    },
    ticketItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #f1f5f9'
    },
    ticketId: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1e293b'
    },
    ticketStatus: (status) => {
      const colors = {
        'Open': '#ef4444',
        'In Progress': '#f59e0b',
        'Resolved': '#10b981',
        'Closed': '#6b7280'
      };
      return {
        fontSize: '12px',
        color: colors[status] || '#6b7280',
        backgroundColor: (colors[status] || '#6b7280') + '15',
        padding: '4px 8px',
        borderRadius: '6px',
        fontWeight: '500'
      };
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{...styles.header, justifyContent: 'center'}}>
          <div>Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
          </div>
          <div>
            <h1 style={styles.headerTitle}>Support Dashboard</h1>
            <div style={styles.headerSubtitle}>Monitor and manage all support tickets</div>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={{fontSize: '14px', color: '#cbd5e1'}}>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Stats */}
        <div style={styles.statsGrid}>
          <StatCard 
            title="Total Tickets" 
            value={stats.total}
            color="#3b82f6"
            subtitle="All time"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>}
          />
          <StatCard 
            title="Open Tickets" 
            value={stats.open}
            color="#ef4444"
            subtitle="Needs attention"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M13,17H11V15H13V17M13,13H11V7H13V13Z"/></svg>}
          />
          <StatCard 
            title="In Progress" 
            value={stats.inProgress}
            color="#f59e0b"
            subtitle="Being worked on"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18V12L12,6Z"/></svg>}
          />
          <StatCard 
            title="Resolved Today" 
            value={stats.resolved}
            color="#10b981"
            subtitle="Successfully closed"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/></svg>}
          />
        </div>

        <div style={styles.contentGrid}>
          {/* Left Column - Charts */}
          <div>
            {/* Trends Chart */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Ticket Trends</h3>
              <div style={styles.cardSubtitle}>Created vs Resolved tickets over the last 7 days</div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer>
                  <BarChart data={trendData}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <Bar dataKey="created" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Issue Type Distribution */}
            <div style={{...styles.card, marginTop: '24px'}}>
              <h3 style={styles.cardTitle}>Issue Type Distribution</h3>
              <div style={styles.cardSubtitle}>Breakdown of tickets by issue type</div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer>
                  <BarChart data={issueTypeData} layout="horizontal">
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      width={80}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Priority & Recent */}
          <div>
            {/* Priority Distribution */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Priority Distribution</h3>
              <div style={styles.cardSubtitle}>Current ticket priorities</div>
              <div style={styles.pieChartContainer}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={styles.legend}>
                {priorityData.map((item, index) => (
                  <div key={index} style={styles.legendItem}>
                    <div style={styles.legendColor(item.color)}></div>
                    <span style={styles.legendText}>{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{...styles.card, marginTop: '24px'}}>
              <h3 style={styles.cardTitle}>Quick Stats</h3>
              <div style={styles.quickStats}>
                <div style={styles.quickStatItem}>
                  <div style={styles.quickStatValue}>{Math.round((stats.resolved / stats.total) * 100)}%</div>
                  <div style={styles.quickStatLabel}>Resolution Rate</div>
                </div>
                <div style={styles.quickStatItem}>
                  <div style={styles.quickStatValue}>{stats.highPriority}</div>
                  <div style={styles.quickStatLabel}>High Priority</div>
                </div>
              </div>
            </div>

            {/* Recent Tickets */}
            <div style={{...styles.card, marginTop: '24px'}}>
              <h3 style={styles.cardTitle}>Recent Tickets</h3>
              <div style={styles.cardSubtitle}>Latest ticket activity</div>
              <div style={styles.recentTickets}>
                {tickets.slice(0, 6).map((ticket) => (
                  <div key={ticket._id} style={styles.ticketItem}>
                    <div>
                      <div style={styles.ticketId}>{ticket.ticketId}</div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>{ticket.issueType}</div>
                    </div>
                    <div style={styles.ticketStatus(ticket.status)}>
                      {ticket.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;