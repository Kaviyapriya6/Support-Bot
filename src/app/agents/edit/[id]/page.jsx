// app/agent/edit/[id]/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircularProgress, Box, Alert } from '@mui/material';
import AgentForm from '../../../../components/AgentForm';

export default function EditAgentPage({ params }) {
  const router = useRouter();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/agents/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch agent');
        }

        const data = await response.json();
        setAgent(data);
      } catch (err) {
        console.error('Error fetching agent:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAgent();
    }
  }, [params.id]);

  const handleSubmit = async (values) => {
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/agents/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update agent');
      }

      const data = await response.json();
      
      // Redirect to agents list or agent details
      router.push('/agents');
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading agent: {error}
        </Alert>
      </Box>
    );
  }

  if (!agent) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          Agent not found
        </Alert>
      </Box>
    );
  }

  return (
    <div>
      <AgentForm 
        onSubmit={handleSubmit} 
        initialData={agent}
        isEdit={true}
      />
    </div>
  );
}