// app/agent/create/page.js
'use client';

import { useRouter } from 'next/navigation';
import AgentForm from '../../../components/AgentForm';

export default function CreateAgentPage() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create agent');
      }

      const data = await response.json();
      
      // Redirect to agents list or agent details
      router.push('/agents');
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  };

  return (
    <div>
      <AgentForm onSubmit={handleSubmit} />
    </div>
  );
}