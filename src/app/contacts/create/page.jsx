'use client';

import { useRouter } from 'next/navigation';
import ContactForm from '../../../components/ContactForm'; // Adjust the import path as necessary
import { addContact } from '../../lib/contacts'; // Adjust the import path as necessary
import { Box, Alert } from '@mui/material';
import { useState } from 'react';

const CreateContactPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = (formData) => {
    try {
      addContact(formData);
      setNotification({
        open: true,
        message: 'Contact created successfully!',
        severity: 'success'
      });
      
      // Redirect after a short delay to show the notification
      setTimeout(() => {
        router.push('/contact');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to create contact. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <ContactForm onSubmit={handleSubmit} />
      
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

export default CreateContactPage;