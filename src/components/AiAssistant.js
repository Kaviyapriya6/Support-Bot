// src/components/ChatBot.js
import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AiAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (!input && !file) return;

    const newMessage = {
      text: input,
      file: file ? {
        name: file.name,
        url: URL.createObjectURL(file),
      } : null,
      fromUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        backgroundColor: '#fafafa'
      }}
    >
      <Typography variant="h6" mb={2}>
        BizBooks ChatBot
      </Typography>

      <Paper sx={{ flex: 1, overflowY: 'auto', mb: 2, p: 1 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{ flexDirection: msg.fromUser ? 'row-reverse' : 'row' }}
            >
              <Box>
                {msg.text && (
                  <ListItemText
                    primary={msg.text}
                    secondary={msg.timestamp}
                    sx={{ textAlign: msg.fromUser ? 'right' : 'left' }}
                  />
                )}
                {msg.file && (
                  <Typography
                    variant="body2"
                    sx={{ color: 'blue', cursor: 'pointer', textAlign: msg.fromUser ? 'right' : 'left' }}
                    component="a"
                    href={msg.file.url}
                    download={msg.file.name}
                  >
                    📎 {msg.file.name}
                  </Typography>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <input
          type="file"
          id="file-upload"
          hidden
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
        </label>

        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />

        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AiAssistant;
