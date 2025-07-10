'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AddCompanyForm from '../../../../components/CompanyForm';

export default function EditCompanyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/company/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch company');
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error('Error fetching company:', err);
        router.push('/company');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCompany();
  }, [id]);

  if (loading) return <p>Loading company details…</p>;
  if (!company) return null;

  return <AddCompanyForm editMode={false} />;
}
