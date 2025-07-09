'use client';

import { useState } from 'react';
import {
  Box, TextField, Button, Typography, Avatar, Paper, Grid, Alert, MenuItem,
  FormControl, InputLabel, Select, IconButton, Chip
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(initialData.profileImage || null);
  const [currentTag, setCurrentTag] = useState('');
  const [serverError, setServerError] = useState('');

  const timezones = [
    'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00',
    'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00',
    'UTC-02:00', 'UTC-01:00', 'UTC+00:00', 'UTC+01:00', 'UTC+02:00',
    'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+05:30', 'UTC+06:00',
    'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00',
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^\+?[\d\s-()]+$/, 'Invalid phone').nullable(),
    workPhone: Yup.string().matches(/^\+?[\d\s-()]+$/, 'Invalid work phone').nullable(),
    twitter: Yup.string().matches(/^@/, 'Twitter must start with @').nullable(),
  });

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setImagePreview(imageUrl);
      setFieldValue('profileImage', imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (setFieldValue) => {
    setImagePreview(null);
    setFieldValue('profileImage', null);
  };

  const handleAddTag = (values, setFieldValue) => {
    const tag = currentTag.trim();
    if (tag && !values.tags.includes(tag)) {
      setFieldValue('tags', [...values.tags, tag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tag, values, setFieldValue) => {
    setFieldValue(
      'tags',
      values.tags.filter((t) => t !== tag)
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit Contact' : 'Create New Contact'}
      </Typography>

      <Formik
        initialValues={{
          name: initialData.name || '',
          title: initialData.title || '',
          company: initialData.company || '',
          email: initialData.email || '',
          phone: initialData.phone || '',
          workPhone: initialData.workPhone || '',
          twitter: initialData.twitter || '',
          facebook: initialData.facebook || '',
          tags: initialData.tags || [],
          timezone: initialData.timezone || '',
          profileImage: initialData.profileImage || null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setServerError('');
          try {
            await onSubmit(values);
          } catch (err) {
            setServerError(err.message || 'Something went wrong.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar src={imagePreview} sx={{ width: 100, height: 100, mr: 2 }}>
                {values.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-image-upload"
                  type="file"
                  onChange={(e) => handleImageUpload(e, setFieldValue)}
                />
                <label htmlFor="profile-image-upload">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                {imagePreview && (
                  <IconButton color="error" onClick={() => handleRemoveImage(setFieldValue)}>
                    <Delete />
                  </IconButton>
                )}
              </Box>
            </Box>

            <Grid container spacing={3}>
              {['name', 'title', 'company', 'email', 'phone', 'workPhone', 'twitter', 'facebook'].map((field) => (
                <Grid item xs={12} md={6} key={field}>
                  <Field
                    as={TextField}
                    fullWidth
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    helperText={<ErrorMessage name={field} />}
                  />
                </Grid>
              ))}

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    name="timezone"
                    value={values.timezone}
                    onChange={(e) => setFieldValue('timezone', e.target.value)}
                  >
                    {timezones.map((tz) => (
                      <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>Tags</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    label="Add tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(values, setFieldValue);
                      }
                    }}
                  />
                  <Button onClick={() => handleAddTag(values, setFieldValue)}>Add</Button>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {values.tags.map((tag) => (
                    <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag, values, setFieldValue)} />
                  ))}
                </Box>
              </Grid>
            </Grid>

            {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={() => router.push('/contacts')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isEdit ? 'Update Contact' : 'Create Contact'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default ContactForm;
