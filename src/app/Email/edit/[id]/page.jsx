'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SupportTicketForm from '../../../../components/EmailForm';

export default function EditEmailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await fetch(`/api/email/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch email');
        const data = await res.json();
        setEmail(data);
      } catch (err) {
        console.error('Error fetching email:', err);
        router.push('/email');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmail();
  }, [id]);

  if (loading) return <p>Loading email details…</p>;
  if (!email) return null;

  return <SupportTicketForm editMode={false} />;
}
