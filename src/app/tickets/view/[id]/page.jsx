'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import TicketView from '../../../../components/TicketViewPage';

export default function ViewTicketPage() {
  const router = useRouter();
  const { id } = useParams();

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await fetch(`/api/tickets/${id}`);
      if (!res.ok) throw new Error('Failed to fetch ticket');
      const data = await res.json();
      setTicketData(data);
    } catch (err) {
      console.error(err);
      setError('Error fetching ticket. Please try again.');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!ticketData) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="error">
          Ticket not found.
        </Typography>
        <Button onClick={() => router.push('/tickets')} sx={{ mt: 2 }}>
          Back to Tickets
        </Button>

        {/* Snackbar for fetch errors */}
        <Snackbar
          open={toastOpen}
          autoHideDuration={4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <>
      <TicketView ticketData={ticketData} />

      {/* Snackbar for fetch errors (if you also want it here, just in case) */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
