'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack
} from '@mui/material';
import {
  Person as AgentsIcon,
  Groups as GroupsIcon,
  Security as RolesIcon,
  AccessTime as BusinessHoursIcon,
  Psychology as SkillsIcon,
  EventAvailable as ShiftsIcon,
  AvTimer as StatusesIcon,
  FiberNew as NewIcon
} from '@mui/icons-material';

const teamSettings = [
  {
    icon: <AgentsIcon color="primary" fontSize="medium" />,
    title: 'Agents',
    description: "Define agents' scope of work, type, language, and other details.",
    link: '/agent', // 🔗 Route to app/agent/page.jsx
  },
  {
    icon: <GroupsIcon color="primary" fontSize="medium" />,
    title: 'Groups',
    description: 'Organize agents and receive notifications on unattended tickets.',
  },
  {
    icon: <RolesIcon color="primary" fontSize="medium" />,
    title: 'Roles',
    description: 'Provide and restrict fine-grained levels of access and privileges for agents.',
  },
  {
    icon: <BusinessHoursIcon color="primary" fontSize="medium" />,
    title: 'Business Hours',
    description: 'Define working hours and holidays to set expectations with customers.',
  },
  {
    icon: <SkillsIcon color="primary" fontSize="medium" />,
    title: 'Skills',
    description: 'Automatically assign certain kind of tickets to agents based on their expertise.',
  },
  {
    icon: <ShiftsIcon color="primary" fontSize="medium" />,
    title: 'Agent Shifts',
    description: 'Create and effectively manage agent schedules in one place.',
  },
  {
    icon: <StatusesIcon color="primary" fontSize="medium" />,
    title: 'Agent Statuses',
    description: 'Configure statuses to define agent availability and get clear visibility on where they spend their time.',
    isNew: true,
  },
];

export default function Admin() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Team
      </Typography>
      <Grid container spacing={3}>
        {teamSettings.map((item, index) => {
          const cardContent = (
            <Paper
              elevation={1}
              sx={{
                height: '100%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                bgcolor: 'white',
                cursor: item.link ? 'pointer' : 'default',
                transition: 'transform 0.2s',
                '&:hover': item.link ? { transform: 'scale(1.02)' } : {},
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                {item.icon}
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.title}
                  {item.isNew && (
                    <Chip
                      size="small"
                      label="New"
                      icon={<NewIcon fontSize="small" />}
                      sx={{
                        ml: 1,
                        backgroundColor: '#ecfdf5',
                        color: '#059669',
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#64748b', flexGrow: 1 }}>
                {item.description}
              </Typography>
            </Paper>
          );

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {item.link ? (
                <Link href={item.link} style={{ textDecoration: 'none' }}>
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
