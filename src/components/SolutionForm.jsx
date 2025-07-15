'use client'
import React, { useState } from 'react';
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
  Tooltip
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
  ExpandLess
} from '@mui/icons-material';

export default function CMSEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedHierarchy, setSelectedHierarchy] = useState('');
  const [tags, setTags] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [templatesExpanded, setTemplatesExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);
  const [seoExpanded, setSeoExpanded] = useState(true);

  const templates = [
    '[Sample] User Guide template',
    '[Sample] How to template',
    '[Sample] FAQ template'
  ];

  const formatButtons = [
    { icon: <FormatBold />, tooltip: 'Bold' },
    { icon: <FormatItalic />, tooltip: 'Italic' },
    { icon: <FormatUnderlined />, tooltip: 'Underline' },
  ];

  const listButtons = [
    { icon: <FormatListBulleted />, tooltip: 'Bullet List' },
    { icon: <FormatListNumbered />, tooltip: 'Numbered List' },
  ];

  const indentButtons = [
    { icon: <FormatIndentDecrease />, tooltip: 'Decrease Indent' },
    { icon: <FormatIndentIncrease />, tooltip: 'Increase Indent' },
  ];

  const mediaButtons = [
    { icon: <Link />, tooltip: 'Link' },
    { icon: <Image />, tooltip: 'Image' },
    { icon: <VideoLibrary />, tooltip: 'Video' },
    { icon: <TableChart />, tooltip: 'Table' },
    { icon: <AttachFile />, tooltip: 'Attachment' },
    { icon: <Functions />, tooltip: 'Math' },
    { icon: <Code />, tooltip: 'Code' },
    { icon: <Fullscreen />, tooltip: 'Fullscreen' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Main Editor Area */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Top Action Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 1 }}>
          <Button variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button variant="outlined" color="inherit">
            Save
          </Button>
          <Button variant="contained" color="primary">
            Publish
          </Button>
        </Box>

        {/* Title Input */}
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontSize: '1.5rem',
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
            >
              Write with AI
            </Button>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            
            <FormControl size="small" sx={{ minWidth: 80, mr: 1 }}>
              <Select defaultValue="paragraph" displayEmpty>
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
                  <IconButton size="small">
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <ButtonGroup size="small" sx={{ mr: 2 }}>
              {listButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small">
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>

            <ButtonGroup size="small" sx={{ mr: 2 }}>
              {indentButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small">
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {mediaButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton size="small">
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
              placeholder="Type something"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Right Sidebar */}
      <Box sx={{ width: 350, backgroundColor: 'white', borderLeft: '1px solid #e0e0e0', p: 2 }}>
        {/* Templates Section */}
        <Accordion expanded={templatesExpanded} onChange={() => setTemplatesExpanded(!templatesExpanded)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              TEMPLATES (3)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {templates.map((template, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileCopy sx={{ fontSize: 16, color: '#666' }} />
                  <Typography variant="body2" sx={{ color: '#1976d2', cursor: 'pointer' }}>
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
                      <MenuItem value="category1">Category 1</MenuItem>
                      <MenuItem value="category2">Category 2</MenuItem>
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
                  placeholder="Add Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
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
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Bottom Icons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton size="small">
              <Info />
            </IconButton>
            <IconButton size="small">
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
              1
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}