'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TicketForm from '@/components/TicketForm';

export default function EditTicket() {
  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/tickets/${id}`);
        if (!res.ok) throw new Error('Failed to fetch ticket');
        const data = await res.json();

        // Set initial values that TicketForm expects
        setInitialValues({
          customerId: data.customerId || '',
          email: data.email || '',
          phone: data.phone || '',
          ticketId: data.ticketId || '',
          issueType: data.issueType || '',
          priority: data.priority || '',
          status: data.status || 'Open',
          subject: data.subject || '',
          description: data.description || '',
          fileName: data.fileName || '',
        });
      } catch (err) {
        console.error(err);
        alert('Error loading ticket');
        router.push('/tickets');
      }
    };

    fetchTicket();
  }, [id, router]);

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!res.ok) throw new Error('Failed to update ticket');

      router.push('/tickets');
    } catch (err) {
      console.error(err);
      alert('Error updating ticket');
    }
  };

  if (!initialValues) return <p style={{ padding: '20px' }}>Loading…</p>;

  return (
    <>
      <h1 style={{ margin: '20px' }}>Edit Ticket</h1>
      <TicketForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </>
  );
}
