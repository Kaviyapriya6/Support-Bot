let contacts = [
  {
    id: '1',
    name: 'Kaviya Priya',
    title: 'Software Engineer',
    company: 'Tech Corp',
    email: 'priyakaviya2004@gmail.com',
    phone: '6379356492',
    workPhone: '6379356492',
    twitter: '@kaviyapriya',
    facebook: 'kaviya.priya',
    tags: ['Developer', 'React'],
    timezone: 'UTC+05:30',
    profileImage: null,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'kkmma',
    title: 'Designer',
    company: 'Design Studio',
    email: 'priyakaviya204@gmail.com',
    phone: '6379356492',
    workPhone: '6379356492',
    twitter: '@kkmma',
    facebook: 'kkmma',
    tags: ['Designer', 'UI/UX'],
    timezone: 'UTC+05:30',
    profileImage: null,
    createdAt: new Date().toISOString()
  }
];

export const getContacts = () => {
  return contacts;
};

export const getContactById = (id) => {
  return contacts.find(contact => contact.id === id);
};

export const addContact = (contactData) => {
  const newContact = {
    id: Date.now().toString(),
    ...contactData,
    createdAt: new Date().toISOString()
  };
  contacts.push(newContact);
  return newContact;
};

export const updateContact = (id, contactData) => {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...contactData, updatedAt: new Date().toISOString() };
    return contacts[index];
  }
  return null;
};

export const deleteContact = (id) => {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1)[0];
    return deletedContact;
  }
  return null;
};
