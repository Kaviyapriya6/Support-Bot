"use client"
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Avatar,
  Chip,
  Divider,
  Card,
  CardContent,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  TextareaAutosize
} from '@mui/material';
import {
  Search as SearchIcon,
  IosShare as ExportIcon,
  Download as ImportIcon,      // ✅ FIXED LINE
  Sync as SyncIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
  Warning as WarningIcon,
  Business as BusinessIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CompaniesPage = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState('');
  const [createdFilter, setCreatedFilter] = useState('Any time');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [formData, setFormData] = useState(null);
  const [fieldFilter, setFieldFilter] = useState('all');
  const [fieldSearch, setFieldSearch] = useState('');

  // Export form state
  const [exportFields, setExportFields] = useState({
    companyName: true,
    healthScore: true,
    description: false,
    notes: false,
    domainsForCompany: false,
    renewalDate: false,
    accountTier: false,
    industry: false
  });

  // Sample companies data
  const [companies, setCompanies] = useState([
    { 
      id: 1, 
      name: 'Acme Inc', 
      contacts: 0, 
      avatar: 'A',
      description: 'Acme Inc is a versatile manufacturing company known for producing a wide range of industrial and consumer products, emphasizing quality and innovation.',
      notes: 'Extremely happy with our support',
      domains: ['acme.com'],
      healthScore: 'Your choice',
      accountTier: 'Your choice',
      renewalDate: '',
      industry: 'Your choice'
    },
    { 
      id: 2, 
      name: 'Advanced Machinery', 
      contacts: 0, 
      avatar: 'A',
      description: 'Advanced manufacturing solutions provider',
      notes: 'Good potential client',
      domains: ['advancedmachinery.com'],
      healthScore: 'Your choice',
      accountTier: 'Your choice',
      renewalDate: '',
      industry: 'Your choice'
    },
    { 
      id: 3, 
      name: 'Freshworks', 
      contacts: 0, 
      avatar: 'F',
      description: 'Customer engagement software company',
      notes: 'Strategic partner',
      domains: ['freshworks.com'],
      healthScore: 'Your choice',
      accountTier: 'Your choice',
      renewalDate: '',
      industry: 'Your choice'
    },
    { 
      id: 4, 
      name: 'Global Learning Inc', 
      contacts: 0, 
      avatar: 'G',
      description: 'Educational technology solutions',
      notes: 'Expanding globally',
      domains: ['globallearning.com'],
      healthScore: 'Your choice',
      accountTier: 'Your choice',
      renewalDate: '',
      industry: 'Your choice'
    },
    { 
      id: 5, 
      name: 'Jet Propulsion Laboratory , NASA', 
      contacts: 0, 
      avatar: 'J',
      description: 'Space exploration and research',
      notes: 'Government contract',
      domains: ['jpl.nasa.gov'],
      healthScore: 'Your choice',
      accountTier: 'Your choice',
      renewalDate: '',
      industry: 'Your choice'
    }
  ]);

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setSelectedCompanies(companies.map(company => company.id));
    } else {
      setSelectedCompanies([]);
    }
  };

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies(prev => {
      if (prev.includes(companyId)) {
        return prev.filter(id => id !== companyId);
      } else {
        return [...prev, companyId];
      }
    });
  };

  const openSidebar = (type) => {
    setSidebarType(type);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarType('');
    setEditingCompany(null);
  };

  const handleMenuClick = (event, companyId) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCompanyId(companyId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCompanyId(null);
  };

  const handleEdit = () => {
    const company = companies.find(c => c.id === selectedCompanyId);
    setEditingCompany(company);
    setFormData({
      name: company.name,
      description: company.description || '',
      notes: company.notes || '',
      domains: company.domains || [],
      healthScore: company.healthScore || 'Your choice',
      accountTier: company.accountTier || 'Your choice',
      renewalDate: company.renewalDate || '',
      industry: company.industry || 'Your choice'
    });
    openSidebar('edit');
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    setCompanies(companies.filter(c => c.id !== selectedCompanyId));
    setDeleteDialogOpen(false);
    setSelectedCompanyId(null);
  };

  const handleEditSave = (updatedCompany) => {
    setCompanies(companies.map(c => 
      c.id === updatedCompany.id ? updatedCompany : c
    ));
    closeSidebar();
  };

  const handleExportFieldChange = (field) => {
    setExportFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderEditSidebar = () => {
    if (!editingCompany || !formData) return null;

    return (
      <Box sx={{ width: 600, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Edit Company</Typography>
          <IconButton onClick={closeSidebar} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          This field is mandatory
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Company Name *
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Company Name"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <RadioGroup
            row
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
          >
            <FormControlLabel
              value="mandatory"
              control={<Radio />}
              label="Mandatory fields"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All fields"
            />
          </RadioGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a field"
            value={fieldSearch}
            onChange={(e) => setFieldSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#666', mr: 1 }} />
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Notes
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Notes"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Domains for this company
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.domains[0] || ''}
              onChange={(e) => setFormData({ ...formData, domains: [e.target.value] })}
            >
              <MenuItem value="acme.com">acme.com</MenuItem>
              <MenuItem value="example.com">example.com</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Health Score
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.healthScore}
              onChange={(e) => setFormData({ ...formData, healthScore: e.target.value })}
            >
              <MenuItem value="Your choice">Your choice</MenuItem>
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Account Tier
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.accountTier}
              onChange={(e) => setFormData({ ...formData, accountTier: e.target.value })}
            >
              <MenuItem value="Your choice">Your choice</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Basic">Basic</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Renewal Date
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.renewalDate}
              onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
            >
              <MenuItem value="">Select date</MenuItem>
              <MenuItem value="2024-12-31">2024-12-31</MenuItem>
              <MenuItem value="2025-12-31">2025-12-31</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Industry
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <MenuItem value="Your choice">Your choice</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button variant="outlined" onClick={closeSidebar}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleEditSave({ ...editingCompany, ...formData })}>
            Update company
          </Button>
        </Box>
      </Box>
    );
  };

  const renderExportSidebar = () => (
    <Box sx={{ width: 600, p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ExportIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Export companies</Typography>
        <IconButton onClick={closeSidebar} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        You can now track all your exports here
      </Alert>

      <Typography variant="body2" sx={{ mb: 2 }}>Select all</Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.companyName}
              onChange={() => handleExportFieldChange('companyName')}
            />
          }
          label="Company Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.description}
              onChange={() => handleExportFieldChange('description')}
            />
          }
          label="Description"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.notes}
              onChange={() => handleExportFieldChange('notes')}
            />
          }
          label="Notes"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.domainsForCompany}
              onChange={() => handleExportFieldChange('domainsForCompany')}
            />
          }
          label="Domains for this company"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.healthScore}
              onChange={() => handleExportFieldChange('healthScore')}
            />
          }
          label="Health score"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.accountTier}
              onChange={() => handleExportFieldChange('accountTier')}
            />
          }
          label="Account tier"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.renewalDate}
              onChange={() => handleExportFieldChange('renewalDate')}
            />
          }
          label="Renewal date"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exportFields.industry}
              onChange={() => handleExportFieldChange('industry')}
            />
          }
          label="Industry"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button variant="outlined" onClick={closeSidebar}>
          Cancel
        </Button>
        <Button variant="contained">
          Export
        </Button>
      </Box>
    </Box>
  );

  const renderImportSidebar = () => (
    <Box sx={{ width: 600, p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ImportIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Import companies</Typography>
        <IconButton onClick={closeSidebar} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ mb: 4 }}>
        From here, you can import companies into Freshdesk using a CSV. Take a look at{' '}
        <a href="#" style={{ color: '#1976d2' }}>this article</a> before you prepare the CSV file for importing. 
        Make sure the CSV is encoded in UTF-8 and the header row has the company labels listed (company name, description etc.)
      </Typography>

      <Box 
        sx={{ 
          border: '2px dashed #ccc', 
          borderRadius: 2, 
          p: 6, 
          textAlign: 'center',
          mb: 4
        }}
      >
        <UploadIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
        <Button variant="outlined" component="label">
          Upload a file
          <input type="file" hidden accept=".csv" />
        </Button>
        <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
          or drag and drop your CSV file here
        </Typography>
      </Box>

      <Card sx={{ bgcolor: '#fff3e0', border: '1px solid #ffcc02' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <WarningIcon sx={{ color: '#ff9800', mr: 1, mt: 0.5 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Important note
              </Typography>
              <Typography variant="body2">
                • If an existing company is found in the CSV file, their information will be updated in Freshdesk
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderSyncSidebar = () => (
    <Box sx={{ width: 600, p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SyncIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Sync companies</Typography>
        <IconButton onClick={closeSidebar} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Sync companies directly with your existing apps
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 4, color: '#666' }}>
        Easily access data by connecting with your existing partner
      </Typography>

      <List>
        {[
          { name: 'Freshsales Suite', icon: '🔄', color: '#ff6b35' },
          { name: 'Pipedrive', icon: '📊', color: '#28a745' },
          { name: 'Salesforce Connector App', icon: '☁️', color: '#00a1e0' },
          { name: 'Hubspot Connector App', icon: '🔗', color: '#ff7a59' },
          { name: 'Zoho CRM Connector App', icon: '🏢', color: '#d32f2f' }
        ].map((app, index) => (
          <ListItem
            key={index}
            button
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              mb: 1,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: app.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px'
                }}
              >
                {app.icon}
              </Box>
            </ListItemIcon>
            <ListItemText primary={app.name} />
            <ChevronRightIcon />
          </ListItem>
        ))}
        
        <ListItem
          button
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <ListItemIcon>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <BusinessIcon />
            </Box>
          </ListItemIcon>
          <ListItemText primary="More apps" />
          <ChevronRightIcon />
        </ListItem>
      </List>
    </Box>
  );

  const getAvatarColor = (name) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const renderSidebarContent = () => {
    switch (sidebarType) {
      case 'export':
        return renderExportSidebar();
      case 'import':
        return renderImportSidebar();
      case 'sync':
        return renderSyncSidebar();
      case 'edit':
        return renderEditSidebar();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                indeterminate={selectedCompanies.length > 0 && selectedCompanies.length < companies.length}
              />
            }
            label="Select all"
          />
          
          <TextField
            placeholder="Search all companies"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#666', mr: 1 }} />
            }}
            sx={{ ml: 2, width: 300 }}
          />

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              onClick={() => openSidebar('export')}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<ImportIcon />}
              onClick={() => openSidebar('import')}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={() => openSidebar('sync')}
            >
              Sync
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            FILTERS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Created
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={createdFilter}
                onChange={(e) => setCreatedFilter(e.target.value)}
              >
                <MenuItem value="Any time">Any time</MenuItem>
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This week">This week</MenuItem>
                <MenuItem value="This month">This month</MenuItem>
              </Select>
            </FormControl>
            <Button variant="text" sx={{ ml: 2 }}>
              Apply
            </Button>
          </Box>
        </Box>

        {/* Companies Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    indeterminate={selectedCompanies.length > 0 && selectedCompanies.length < companies.length}
                  />
                </TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Contacts</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies
                .filter(company => 
                  company.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((company) => (
                  <TableRow key={company.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => handleSelectCompany(company.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: getAvatarColor(company.name),
                            mr: 2,
                            fontSize: '14px'
                          }}
                        >
                          {company.avatar}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#1976d2' }}>
                          {company.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        ---
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small"
                        onClick={(e) => handleMenuClick(e, company.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            1 - 5 of 5
          </Typography>
          <IconButton size="small" disabled>
            <ChevronRightIcon sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
          <IconButton size="small" disabled>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={closeSidebar}
        PaperProps={{
          sx: { width: 600 }
        }}
      >
        {renderSidebarContent()}
      </Drawer>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 120 }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Delete Company
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this company? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompaniesPage;