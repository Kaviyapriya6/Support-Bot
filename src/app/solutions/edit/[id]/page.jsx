'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Alert, CircularProgress, Typography, Button } from '@mui/material';
import SolutionForm from '../../../../components/SolutionForm';

const EditSolutionPage = () => {
  const router = useRouter();
  const params = useParams();
  const solutionId = params.id;
  
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch solution data
  useEffect(() => {
    const fetchSolution = async () => {
      if (!solutionId) {
        setError('Solution ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/solutions/${solutionId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch solution');
        }

        const data = await response.json();
        setSolution(data.success ? data.data : data);
      } catch (err) {
        console.error('Error fetching solution:', err);
        setError(err.message || 'Failed to load solution');
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [solutionId]);

  const updateSolution = async (formData) => {
    const res = await fetch(`/api/solutions/${solutionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update solution');
    }

    return await res.json();
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await updateSolution(formData);
      console.log('Solution updated successfully:', result);

      setNotification({
        open: true,
        message: 'Solution updated successfully!',
        severity: 'success',
      });

      // Redirect to solutions list after successful update
      setTimeout(() => {
        router.push('/solutions');
      }, 1500);
    } catch (error) {
      console.error('Error updating solution:', error);
      setNotification({
        open: true,
        message: error.message || 'Failed to update solution. Please try again.',
        severity: 'error',
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">
          Loading solution...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => router.push('/solutions')}
          sx={{ mt: 2 }}
        >
          Back to Solutions
        </Button>
      </Box>
    );
  }

  if (!solution) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Solution not found
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => router.push('/solutions')}
          sx={{ mt: 2 }}
        >
          Back to Solutions
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <SolutionForm 
        onSubmit={handleSubmit} 
        initialData={solution}
        isEdit={true}
      />

      {notification.open && (
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          sx={{ 
            position: 'fixed', 
            top: 16, 
            right: 16, 
            zIndex: 1000,
            minWidth: 300
          }}
        >
          {notification.message}
        </Alert>
      )}
    </Box>
  );
};

export default EditSolutionPage;
