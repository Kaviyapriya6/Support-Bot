"use client";
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
