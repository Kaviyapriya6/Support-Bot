'use client';

import { useRouter } from 'next/navigation';
import SupportTicketForm from '../../../components/EmailForm';
import { Box, Alert } from '@mui/material';
import { useState } from 'react';

const CreateEmailPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const addEmail = async (formData) => {
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create email');
    }

    return await res.json();
  };

  const handleSubmit = async (formData) => {
    try {
      await addEmail(formData);
      setNotification({
        open: true,
        message: 'email created successfully!',
        severity: 'success',
      });

      setTimeout(() => {
        router.push('/email');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Failed to create email. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <SupportTicketForm onSubmit={handleSubmit} />

      {notification.open && (
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
        >
          {notification.message}
        </Alert>
      )}
    </Box>
  );
};

export default CreateEmailPage;
