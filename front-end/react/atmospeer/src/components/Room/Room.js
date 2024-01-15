import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Room = ({ userID, youtubeURL }) => {
  const theme = createTheme({ userID });

  const [newAtmospeerName, setNewAtmospeerName] = useState('');

  const handleCreateAtmospeer = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/newroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masterUser: userID,
          url: youtubeURL, // 이 부분은 알맞게 YouTube URL을 가져와서 사용하세요.
          // 다른 필요한 데이터도 필요에 따라 추가하세요.
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('AtmosPEER Created:', data);

      // 생성된 AtmosPEER에 대한 추가 로직을 수행할 수 있습니다.
    } catch (error) {
      console.error('Create AtmosPEER error:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" component="div" gutterBottom>
            새로운 AtmosPEER 만들기
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCreateAtmospeer}>
            만들기
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Room;
