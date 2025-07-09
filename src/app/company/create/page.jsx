'use client';

import { useRouter } from 'next/navigation';
import AddCompanyForm from '../../../components/CompanyForm'; // Adjust the import path if needed
import { addCompany } from '../../lib/company'; // Updated path and function name
import { Box, Alert } from '@mui/material';
import { useState } from 'react';

const CreateCompanyPage = () => {
  const router = useRouter();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = (formData) => {
    try {
      addCompany(formData);
      setNotification({
        open: true,
        message: 'Company created successfully!',
        severity: 'success'
      });

      // Redirect after a short delay to show the notification
      setTimeout(() => {
        router.push('/company');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to create company. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <AddCompanyForm onSubmit={handleSubmit} />

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

export default CreateCompanyPage;
