'use client';

import { useRouter } from 'next/navigation';
import ContactForm from '.././../../components/ContactForm'; // Adjust the import path as necessary
import { Box, Alert } from '@mui/material';
import { useState } from 'react';

const CreateContactPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (data) => {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setNotification({ message: 'Created successfully!', severity: 'success' });
      setTimeout(() => router.push('/contacts'), 1500);
    } else {
      setNotification({ message: 'Failed to create.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <ContactForm onSubmit={handleSubmit} />
      {notification && (
        <Alert severity={notification.severity} sx={{ mt: 2 }}>{notification.message}</Alert>
      )}
    </Box>
  );
};

export default CreateContactPage;
