import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Paper,
  Grid,
  InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
      color: '#333',
    },
  },
});

export default function AddCompanyForm() {
  const [formData, setFormData] = useState({
    companyName: 'Ramani Lakshmipriya J',
    fieldView: 'allFields',
    searchField: '',
    description: '',
    notes: '',
    domains: '',
    healthScore: '',
    accountTier: '',
    renewalDate: '',
    industry: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleCreateCompany = () => {
    console.log('Create company clicked', formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, backgroundColor: '#ffffff' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#2c3e50' }}>
            Add Company
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
              This field is mandatory
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              Company Name*
            </Typography>
            <TextField
              fullWidth
              value={formData.companyName}
              onChange={handleInputChange('companyName')}
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#e8f4fd',
                  '& fieldset': {
                    borderColor: '#d1e7dd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <RadioGroup
              row
              value={formData.fieldView}
              onChange={handleInputChange('fieldView')}
              sx={{ mb: 2 }}
            >
              <FormControlLabel 
                value="mandatoryFields" 
                control={<Radio size="small" />} 
                label="Mandatory fields" 
                sx={{ mr: 3 }}
              />
              <FormControlLabel 
                value="allFields" 
                control={<Radio size="small" />} 
                label="All fields"
              />
            </RadioGroup>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search for a field"
              value={formData.searchField}
              onChange={handleInputChange('searchField')}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                },
              }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter some text"
                value={formData.description}
                onChange={handleInputChange('description')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter some text"
                value={formData.notes}
                onChange={handleInputChange('notes')}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Domains for this company
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.domains}
                  onChange={handleInputChange('domains')}
                  displayEmpty
                  sx={{
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em style={{ color: '#999' }}>Your choice</em>
                  </MenuItem>
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Health Score
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.healthScore}
                  onChange={handleInputChange('healthScore')}
                  displayEmpty
                  sx={{
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em style={{ color: '#999' }}>Your choice</em>
                  </MenuItem>
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="average">Average</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Account Tier
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.accountTier}
                  onChange={handleInputChange('accountTier')}
                  displayEmpty
                  sx={{
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em style={{ color: '#999' }}>Your choice</em>
                  </MenuItem>
                  <MenuItem value="enterprise">Enterprise</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="basic">Basic</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Renewal Date
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.renewalDate}
                  onChange={handleInputChange('renewalDate')}
                  displayEmpty
                  sx={{
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em style={{ color: '#999' }}>Your choice</em>
                  </MenuItem>
                  <MenuItem value="2024-01-01">January 1, 2024</MenuItem>
                  <MenuItem value="2024-06-01">June 1, 2024</MenuItem>
                  <MenuItem value="2024-12-01">December 1, 2024</MenuItem>
                  <MenuItem value="2025-01-01">January 1, 2025</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Industry
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={formData.industry}
                  onChange={handleInputChange('industry')}
                  displayEmpty
                  sx={{
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em style={{ color: '#999' }}>Your choice</em>
                  </MenuItem>
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="healthcare">Healthcare</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="manufacturing">Manufacturing</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                borderColor: '#d1d5db',
                color: '#6b7280',
                '&:hover': {
                  borderColor: '#9ca3af',
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateCompany}
              sx={{
                backgroundColor: '#1f2937',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#111827',
                },
              }}
            >
              Create company
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}