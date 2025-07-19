// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import DataTable from '../../components/DataTable';
// import GroupForm from '../../components/GroupForm';
// import { Box } from '@mui/material';

// const GroupsPage = () => {
//   const router = useRouter();
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);

//   // Fetch groups
//   const fetchGroups = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/groups');
//       const data = await response.json();
      
//       if (data.success) {
//         setGroups(data.data);
//       } else {
//         setError(data.error || 'Failed to fetch groups');
//       }
//     } catch (err) {
//       setError('Failed to fetch groups');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   // Handle create group
//   const handleCreateGroup = async (formData) => {
//     try {
//       setFormLoading(true);
//       const response = await fetch('/api/groups', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setShowCreateForm(false);
//         fetchGroups();
//         setError(null);
//       } else {
//         setError(data.error || 'Failed to create group');
//       }
//     } catch (err) {
//       setError('Failed to create group');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Handle delete group
//   const handleDeleteGroup = async (groupId) => {
//     const response = await fetch(`/api/groups/${groupId}`, {
//       method: 'DELETE',
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       setGroups(groups.filter(group => group._id !== groupId));
//       setError(null);
//     } else {
//       throw new Error(data.error || 'Failed to delete group');
//     }
//   };

//   // Handle edit group
//   const handleEditGroup = (groupId) => {
//     router.push(`/groups/edit/${groupId}`);
//   };

//   const handleAddGroup = () => {
//     setShowCreateForm(true);
//   };

//   const columns = [
//     {
//       field: 'name',
//       header: 'Name'
//     },
//     {
//       field: 'description',
//       header: 'Description'
//     },
//     {
//       field: 'activeAgents',
//       header: 'Active Agents',
//       type: 'status',
//       statusColors: {
//         0: 'default',
//         1: 'success'
//       }
//     },
//     {
//       field: 'businessHours',
//       header: 'Business Hours'
//     }
//   ];

//   const searchFields = ['name', 'description', 'businessHours'];

//   return (
//     <Box>
//       <DataTable
//         title="Groups"
//         data={groups}
//         columns={columns}
//         loading={loading}
//         error={error}
//         onAdd={handleAddGroup}
//         onEdit={handleEditGroup}
//         onDelete={handleDeleteGroup}
//         searchFields={searchFields}
//         entityType="group"
//       />

//       {/* Create Group Form */}
//       <GroupForm
//         open={showCreateForm}
//         onClose={() => setShowCreateForm(false)}
//         onSubmit={handleCreateGroup}
//         loading={formLoading}
//       />
//     </Box>
//   );
// };

// export default GroupsPage;
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '../../components/DataTable';

export default function GroupsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGroups = async () => {
    try {
      const res = await fetch('/api/groups');
      if (!res.ok) throw new Error('Failed to fetch groups');
      const data = await res.json();
      setGroups(data.data || data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleView = (id) => {
    router.push(`/groups/${id}`);
  };

  const handleAdd = () => {
    router.push('/groups/create');
  };

  const handleEdit = (id) => {
    router.push(`/groups/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/groups/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) throw new Error('Failed to delete group');
    
    // Remove the deleted group from the list
    setGroups(groups.filter(group => group._id !== id));
  };

  const columns = [
    {
      field: 'name',
      header: 'Group Name'
    },
    {
      field: 'description',
      header: 'Description'
    },
    {
      field: 'businessHours',
      header: 'Business Hours'
    },
    {
      field: 'activeAgents',
      header: 'Active Agents'
    },
    {
      field: 'createdAt',
      header: 'Created Date',
      type: 'date'
    }
  ];

  const searchFields = ['name', 'description', 'businessHours'];

  return (
    <DataTable
      title="Groups"
      data={groups}
      columns={columns}
      loading={loading}
      error={error}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onView={handleView}
      searchFields={searchFields}
      entityType="group"
    />
  );
}
 
