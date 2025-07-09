export const addContact = async (formData) => {
  const res = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    throw new Error('Failed to create contact');
  }

  return await res.json();
};

export const updateContact = async (id, formData) => {
  const res = await fetch(`/api/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    throw new Error('Failed to update contact');
  }

  return await res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`/api/contacts/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete contact');
  }

  return await res.json();
};
