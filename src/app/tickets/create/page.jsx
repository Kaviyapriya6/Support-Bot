'use client';

import TicketForm from '@/components/TicketForm';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';

export default function CreateTicket() {
  const router = useRouter();

  const initialValues = {
    customerId: '',
    email: '',
    phone: '',
    ticketId: `TICKET-${Date.now()}`,
    issueType: '',
    priority: '',
    status: 'Open',
    subject: '',
    description: '',
    file: null
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create ticket');
      }

      const savedTicket = await response.json();
      console.log('Ticket created:', savedTicket);
      
      // Navigate back to tickets list
      router.push('/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Let TicketForm handle the error display
      throw error;
    }
  };

  return (
    <Box p={4}>
      {/* <Typography variant="h4" gutterBottom>
        Create Ticket
      </Typography> */}
      <TicketForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        mode="create"
      />
    </Box>
  );
}
