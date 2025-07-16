'use client'
import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  IconButton,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  InputAdornment,
  ButtonGroup,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert
} from '@mui/material';
import {
  AutoAwesome,
  ExpandMore,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatIndentDecrease,
  FormatIndentIncrease,
  Link,
  Image,
  VideoLibrary,
  TableChart,
  AttachFile,
  Functions,
  Code,
  Fullscreen,
  Add,
  Info,
  Language,
  FileCopy,
  ExpandLess,
  Delete,
  Edit,
  Save,
  Visibility
} from '@mui/icons-material';

export default function CMSEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedHierarchy, setSelectedHierarchy] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [templatesExpanded, setTemplatesExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  
  // Dialog states
  const [linkDialog, setLinkDialog] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  
  const contentRef = useRef(null);

  const templates = [
    '[Sample] User Guide template',
    '[Sample] How to template',
    '[Sample] FAQ template'
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ open: true, message, type });
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  // Text formatting functions
  const formatText = (formatType) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    
    switch (formatType) {
      case 'bold':
        formattedText = selectedText ? `**${selectedText}**` : '**bold text**';
        break;
      case 'italic':
        formattedText = selectedText ? `*${selectedText}*` : '*italic text*';
        break;
      case 'underline':
        formattedText = selectedText ? `<u>${selectedText}</u>` : '<u>underlined text</u>';
        break;
      case 'bulletList':
        formattedText = selectedText ? `• ${selectedText}` : '• List item';
        break;
      case 'numberedList':
        formattedText = selectedText ? `1. ${selectedText}` : '1. List item';
        break;
      case 'code':
        formattedText = selectedText ? `\`${selectedText}\`` : '`code`';
        break;
      case 'heading1':
        formattedText = selectedText ? `# ${selectedText}` : '# Heading 1';
        break;
      case 'heading2':
        formattedText = selectedText ? `## ${selectedText}` : '## Heading 2';
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    showNotification(`${formatType} formatting applied`);
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const linkMarkdown = `[${linkText}](${linkUrl})`;
      const textarea = contentRef.current;
      const start = textarea.selectionStart;
      const newContent = content.substring(0, start) + linkMarkdown + content.substring(start);
      setContent(newContent);
      setLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
      showNotification('Link inserted successfully');
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageMarkdown = `![${imageAlt || 'Image'}](${imageUrl})`;
      const textarea = contentRef.current;
      const start = textarea.selectionStart;
      const newContent = content.substring(0, start) + imageMarkdown + content.substring(start);
      setContent(newContent);
      setImageDialog(false);
      setImageUrl('');
      setImageAlt('');
      showNotification('Image inserted successfully');
    }
  };

  const insertTable = () => {
    const tableMarkdown = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |
`;
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const newContent = content.substring(0, start) + tableMarkdown + content.substring(start);
    setContent(newContent);
    showNotification('Table inserted successfully');
  };

  const handleSave = () => {
    showNotification('Article saved successfully');
  };

  const handlePublish = () => {
    setIsPublished(true);
    showNotification('Article published successfully');
  };

  const handlePreview = () => {
    showNotification('Opening preview...');
  };

  const loadTemplate = (templateName) => {
    let templateContent = '';
    switch (templateName) {
      case '[Sample] User Guide template':
        templateContent = `# User Guide

## Overview
Brief description of what this guide covers.

## Prerequisites
- Requirement 1
- Requirement 2

## Step-by-Step Instructions

### Step 1: Getting Started
Instructions for the first step.

### Step 2: Configuration
Instructions for configuration.

### Step 3: Testing
Instructions for testing.

## Troubleshooting
Common issues and solutions.

## Support
Contact information for additional help.`;
        break;
      case '[Sample] How to template':
        templateContent = `# How to [Task Name]

## What You'll Learn
Brief description of the outcome.

## Before You Begin
- Prerequisites
- Required tools/access

## Instructions

1. **First Step**
   Detailed explanation of the first step.

2. **Second Step**
   Detailed explanation of the second step.

3. **Final Step**
   Detailed explanation of the final step.

## Verification
How to verify the task was completed successfully.

## Next Steps
What to do after completing this task.`;
        break;
      case '[Sample] FAQ template':
        templateContent = `# Frequently Asked Questions

## General Questions

**Q: What is this service?**
A: Brief description of the service.

**Q: How do I get started?**
A: Step-by-step getting started instructions.

**Q: What are the system requirements?**
A: List of system requirements.

## Technical Questions

**Q: How do I troubleshoot common issues?**
A: Troubleshooting steps.

**Q: Where can I find more documentation?**
A: Links to additional resources.

## Contact

For questions not covered here, please contact [support information].`;
        break;
      default:
        templateContent = '';
    }
    
    setContent(templateContent);
    showNotification(`Template "${templateName}" loaded successfully`);
  };

  const formatButtons = [
    { icon: <FormatBold />, tooltip: 'Bold', action: () => formatText('bold') },
    { icon: <FormatItalic />, tooltip: 'Italic', action: () => formatText('italic') },
    { icon: <FormatUnderlined />, tooltip: 'Underline', action: () => formatText('underline') },
  ];

  const listButtons = [
    { icon: <FormatListBulleted />, tooltip: 'Bullet List', action: () => formatText('bulletList') },
    { icon: <FormatListNumbered />, tooltip: 'Numbered List', action: () => formatText('numberedList') },
  ];

  const indentButtons = [
    { icon: <FormatIndentDecrease />, tooltip: 'Decrease Indent', action: () => showNotification('Indent decreased') },
    { icon: <FormatIndentIncrease />, tooltip: 'Increase Indent', action: () => showNotification('Indent increased') },
  ];

  const mediaButtons = [
    { icon: <Link />, tooltip: 'Insert Link', action: () => setLinkDialog(true) },
    { icon: <Image />, tooltip: 'Insert Image', action: () => setImageDialog(true) },
    { icon: <VideoLibrary />, tooltip: 'Insert Video', action: () => showNotification('Video insertion coming soon') },
    { icon: <TableChart />, tooltip: 'Insert Table', action: insertTable },
    { icon: <AttachFile />, tooltip: 'Attach File', action: () => showNotification('File attachment coming soon') },
    { icon: <Functions />, tooltip: 'Insert Math', action: () => showNotification('Math insertion coming soon') },
    { icon: <Code />, tooltip: 'Code Block', action: () => formatText('code') },
    { icon: <Fullscreen />, tooltip: 'Fullscreen', action: () => showNotification('Fullscreen mode') },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Main Editor Area */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Top Action Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Article Editor
            </Typography>
            {isPublished && (
              <Chip 
                icon={<Visibility />} 
                label="Published" 
                color="success" 
                size="small" 
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              color="inherit"
              onClick={handlePreview}
              startIcon={<Visibility />}
            >
              Preview
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              onClick={handleSave}
              startIcon={<Save />}
            >
              Save
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim()}
            >
              {isPublished ? 'Update' : 'Publish'}
            </Button>
          </Box>
        </Box>

        {/* Title Input */}
        <TextField
          fullWidth
          placeholder="Enter article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontSize: '1.5rem',
              fontWeight: 500,
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
            },
          }}
        />

        {/* Editor Toolbar */}
        <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Toolbar sx={{ minHeight: '48px !important', px: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Button
              startIcon={<AutoAwesome />}
              size="small"
              sx={{ mr: 2, textTransform: 'none' }}
              onClick={() => showNotification('AI writing assistant coming soon')}
            >
              Write with AI
            </Button>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <FormControl size="small" sx={{ minWidth: 80, mr: 1 }}>
              <Select 
                defaultValue="paragraph" 
                displayEmpty
                onChange={(e) => {
                  if (e.target.value === 'heading1') formatText('heading1');
                  if (e.target.value === 'heading2') formatText('heading2');
                }}
              >
                <MenuItem value="paragraph">¶</MenuItem>
                <MenuItem value="heading1">H1</MenuItem>
                <MenuItem value="heading2">H2</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
              <Select defaultValue="arial" displayEmpty>
                <MenuItem value="arial">Arial</MenuItem>
                <MenuItem value="times">Times</MenuItem>
                <MenuItem value="courier">Courier</MenuItem>
              </Select>
            </FormControl>

            <ButtonGroup size="small" sx={{ mr: 2 }}>
              {formatButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small" onClick={button.action}>
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <ButtonGroup size="small" sx={{ mr: 2 }}>
              {listButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small" onClick={button.action}>
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>

            <ButtonGroup size="small" sx={{ mr: 2 }}>
              {indentButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small" onClick={button.action}>
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {mediaButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small" onClick={button.action}>
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Toolbar>

          {/* Editor Content Area */}
          <Box sx={{ p: 2, minHeight: 400 }}>
            <TextField
              fullWidth
              multiline
              rows={18}
              placeholder="Start writing your article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              inputRef={contentRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          </Box>
        </Paper>

        {/* Article Stats */}
        <Box sx={{ mt: 2, display: 'flex', gap: 2, color: '#666', fontSize: '0.875rem' }}>
          <span>Words: {content.split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>Characters: {content.length}</span>
          <span>Reading time: ~{Math.ceil(content.split(/\s+/).filter(word => word.length > 0).length / 200)} min</span>
        </Box>
      </Box>

      {/* Right Sidebar */}
      <Box sx={{ width: 350, backgroundColor: 'white', borderLeft: '1px solid #e0e0e0', p: 2 }}>
        {/* Templates Section */}
        <Accordion expanded={templatesExpanded} onChange={() => setTemplatesExpanded(!templatesExpanded)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              TEMPLATES ({templates.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {templates.map((template, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileCopy sx={{ fontSize: 16, color: '#666' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#1976d2', 
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => loadTemplate(template)}
                  >
                    {template}
                  </Typography>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Article Properties Section */}
        <Accordion expanded={propertiesExpanded} onChange={() => setPropertiesExpanded(!propertiesExpanded)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              ARTICLE PROPERTIES
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Select hierarchy *
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedHierarchy}
                      onChange={(e) => setSelectedHierarchy(e.target.value)}
                      placeholder="Select hierarchy"
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select hierarchy</em>
                      </MenuItem>
                      <MenuItem value="HOW TO'S">HOW TO'S</MenuItem>
                      <MenuItem value="FAQ">FAQ</MenuItem>
                      <MenuItem value="Troubleshooting">Troubleshooting</MenuItem>
                      <MenuItem value="User Guides">User Guides</MenuItem>
                      <MenuItem value="API Documentation">API Documentation</MenuItem>
                    </Select>
                  </FormControl>
                  <Button size="small" startIcon={<Add />} sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>
                    New folder
                  </Button>
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Tags
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add tags and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button size="small" onClick={handleTagAdd}>Add</Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      onDelete={() => handleTagDelete(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <FormControlLabel
                  control={<Switch checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />}
                  label="Published"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* SEO Section */}
        <Accordion expanded={seoExpanded} onChange={() => setSeoExpanded(!seoExpanded)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              SEARCH ENGINE OPTIMISATION
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Title for search engine
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type article title for SEO"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  helperText={`${seoTitle.length}/60 characters`}
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Description for search engine
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  placeholder="Type article description for SEO"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  helperText={`${seoDescription.length}/160 characters`}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Bottom Icons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton size="small" onClick={() => showNotification('Article info')}>
              <Info />
            </IconButton>
            <IconButton size="small" onClick={() => showNotification('Language settings')}>
              <Language />
            </IconButton>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ 
              width: 24, 
              height: 24, 
              borderRadius: '50%', 
              backgroundColor: '#ff5722',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {tags.length || 0}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Link Dialog */}
      <Dialog open={linkDialog} onClose={() => setLinkDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Link Text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialog(false)}>Cancel</Button>
          <Button onClick={insertLink} variant="contained" disabled={!linkUrl || !linkText}>
            Insert Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialog} onClose={() => setImageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Insert Image</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
            placeholder="https://example.com/image.jpg"
          />
          <TextField
            fullWidth
            label="Alt Text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Describe the image"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialog(false)}>Cancel</Button>
          <Button onClick={insertImage} variant="contained" disabled={!imageUrl}>
            Insert Image
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={notification.type} 
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}