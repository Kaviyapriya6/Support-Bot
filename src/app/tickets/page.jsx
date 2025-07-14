// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Avatar,
//   Chip,
//   Alert
// } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';

// export default function AgentListPage() {
//   const router = useRouter();
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAgents = async () => {
//     try {
//       const res = await fetch('/api/agents');
//       if (!res.ok) throw new Error('Failed to fetch agents');
//       const data = await res.json();
//       setAgents(data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h5">Agent List</Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => router.push('/agent/create')}
//         >
//           New Agent
//         </Button>
//       </Box>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Alert severity="error">{error}</Alert>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Profile</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Agent Type</TableCell>
//                 <TableCell>Language</TableCell>
//                 <TableCell>Roles</TableCell>
//                 <TableCell>Groups</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {agents.map((agent) => (
//                 <TableRow key={agent.id}>
//                   <TableCell>
//                     <Avatar src={agent.profileImage}>
//                       {agent.email?.charAt(0).toUpperCase()}
//                     </Avatar>
//                   </TableCell>
//                   <TableCell>{agent.email}</TableCell>
//                   <TableCell>{agent.agentType}</TableCell>
//                   <TableCell>{agent.language}</TableCell>
//                   <TableCell>
//                     {agent.roles?.map((role) => (
//                       <Chip key={role} label={role} size="small" sx={{ mr: 0.5 }} />
//                     ))}
//                   </TableCell>
//                   <TableCell>
//                     {agent.groups?.map((group) => (
//                       <Chip key={group} label={group} size="small" sx={{ mr: 0.5 }} />
//                     ))}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<EditIcon />}
//                       onClick={() => router.push(`/agent/edit/${agent.id}`)}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {agents.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     No agents found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../../components/DataTable';

export default function TicketListPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/tickets');
      if (!res.ok) throw new Error('Failed to fetch tickets');
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAdd = () => {
    router.push('/tickets/create');
  };

  const handleEdit = (id) => {
    router.push(`/tickets/edit/${id}`);
  };

  const handleView = (id) => {
    router.push(`/tickets/view/${id}`);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/tickets/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) throw new Error('Failed to delete ticket');
    
    // Remove the deleted ticket from the list
    setTickets(tickets.filter(ticket => ticket._id !== id));
  };

  const columns = [
    {
      field: 'ticketId',
      header: 'Ticket ID'
    },
    {
      field: 'subject',
      header: 'Subject'
    },
    {
      field: 'priority',
      header: 'Priority',
      type: 'status',
      statusColors: {
        'low': 'success',
        'medium': 'warning', 
        'high': 'error',
        'urgent': 'error'
      }
    },
    {
      field: 'status',
      header: 'Status',
      type: 'status',
      statusColors: {
        'open': 'warning',
        'in-progress': 'info',
        'resolved': 'success',
        'closed': 'default'
      }
    },
    {
      field: 'assignedTo',
      header: 'Assigned To'
    },
    {
      field: 'createdAt',
      header: 'Created Date',
      type: 'date'
    }
  ];

  const searchFields = ['ticketId', 'subject', 'assignedTo', 'customerName'];

  const filterOptions = {
    priority: {
      label: 'Priority',
      values: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    },
    status: {
      label: 'Status',
      values: [
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' }
      ]
    }
  };

  return (
    <DataTable
      title="Tickets"
      data={tickets}
      columns={columns}
      loading={loading}
      error={error}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onView={handleView}
      onDelete={handleDelete}
      searchFields={searchFields}
      filterOptions={filterOptions}
      entityType="ticket"
      showView={true}
    />
  );
}
