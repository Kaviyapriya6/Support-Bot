'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import AddCompanyForm from '../../../components/CompanyForm';
import { Box, Alert } from '@mui/material';
import { useState } from 'react';

const CreateCompanyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const mode = searchParams.get('mode');
  const contactId = searchParams.get('contactId');
  
  console.log('Company create page - returnUrl:', returnUrl);
  console.log('Company create page - mode:', mode);
  console.log('Company create page - contactId:', contactId);
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const addCompany = async (formData) => {
    const res = await fetch('/api/company', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create company');
    }

    return await res.json();
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await addCompany(formData);
      console.log('Company created successfully:', result);
      console.log('Will redirect with returnUrl:', returnUrl);
      
      setNotification({
        open: true,
        message: 'Company created successfully!',
        severity: 'success',
      });

      setTimeout(() => {
        if (returnUrl) {
          // If there's a return URL, redirect back with company info
          const decodedReturnUrl = decodeURIComponent(returnUrl);
          const separator = decodedReturnUrl.includes('?') ? '&' : '?';
          const redirectUrl = `${decodedReturnUrl}${separator}companyId=${result._id}&companyName=${encodeURIComponent(result.name)}`;
          console.log('Redirecting to:', redirectUrl);
          router.push(redirectUrl);
        } else {
          // Default redirect to company list
          console.log('No return URL, redirecting to company list');
          router.push('/company');
        }
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Failed to create company. Please try again.',
        severity: 'error',
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
