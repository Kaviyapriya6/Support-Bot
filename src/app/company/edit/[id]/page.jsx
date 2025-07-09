'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddCompanyForm from '../../../../components/CompanyForm';

import { getCompanyById, updateCompany } from '../../../lib/company'; // Adjusted function and path names
import { Box, Alert, Typography } from '@mui/material';

const EditCompanyPage = ({ params }) => {
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const companyData = getCompanyById(params.id);
    if (companyData) {
      setCompany(companyData);
    } else {
      router.push('/company');
    }
  }, [params.id, router]);

  const handleSubmit = (formData) => {
    try {
      updateCompany(params.id, formData);
      setNotification({
        open: true,
        message: 'Company updated successfully!',
        severity: 'success'
      });

      setTimeout(() => {
        router.push('/company');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to update company. Please try again.',
        severity: 'error'
      });
    }
  };

  if (!company) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <AddCompanyForm
        onSubmit={handleSubmit}
        initialData={company}
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

export default EditCompanyPage;
