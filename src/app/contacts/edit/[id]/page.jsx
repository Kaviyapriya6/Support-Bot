'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContactForm from '@/components/ContactForm';
import { getContactById, updateContact } from '@/lib/contacts';
import { Box, Alert, Typography } from '@mui/material';

const EditContactPage = ({ params }) => {
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const contactData = getContactById(params.id);
    if (contactData) {
      setContact(contactData);
    } else {
      router.push('/contact');
    }
  }, [params.id, router]);

  const handleSubmit = (formData) => {
    try {
      updateContact(params.id, formData);
      setNotification({
        open: true,
        message: 'Contact updated successfully!',
        severity: 'success'
      });
      
      // Redirect after a short delay to show the notification
      setTimeout(() => {
        router.push('/contact');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to update contact. Please try again.',
        severity: 'error'
      });
    }
  };

  if (!contact) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <ContactForm
        onSubmit={handleSubmit}
        initialData={contact}
        isEdit={true}
      />
      
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

export default EditContactPage;