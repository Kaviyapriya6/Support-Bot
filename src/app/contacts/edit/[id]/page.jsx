'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateContact } from '../../../lib/Contactapi'; 
import ContactForm from '../../../../components/ContactForm'; 

const EditContactPage = () => {
  const router = useRouter();
  const params = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      const res = await fetch(`/api/contacts/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setContact(data);
      }
      setLoading(false);
    };

    fetchContact();
  }, [params.id]);

  const handleSubmit = async (formData) => {
    try {
      await updateContact(params.id, formData);
      router.push('/contacts');
    } catch (err) {
      console.error(err);
      alert('Failed to update contact');
    }
  };

  if (loading) return <p>Loading…</p>;
  if (!contact) return <p>Contact not found.</p>;

  return (
    <div>
      {/* <h1>Edit Contact</h1> */}
      <ContactForm initialData={contact} onSubmit={handleSubmit} isEdit />
    </div>
  );
};

export default EditContactPage;
