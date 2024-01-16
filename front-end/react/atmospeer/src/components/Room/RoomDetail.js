import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Youtube from '../Youtube/Youtube';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RoomDetail = () => {
  const { state } = useLocation();
  const room = state?.room;
  const theme = createTheme();
  const [members, setMembers] = useState([]);
  const [newUserId, setNewUserId] = useState('');

  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/members?roomId=${room.roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const unescapedData = data.responseData.replace(/\\n/g, '\n');
      const responseData = JSON.parse(unescapedData);

      if (Array.isArray(responseData)) {
        setMembers(responseData);
        console.log('Member array: ', members);
      }
    } catch (error) {
      console.error('Fetch Rooms error:', error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [room.roomId]);

  const containerStyle = {
    backgroundImage: `url(${room.roomImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  const positionStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  };

  const handleInviteUser = async () => {
    // 서버에 사용자 초대 요청 보내기
    try {
      const response = await fetch(`http://localhost:3001/api/joinroom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room.roomId,
          userId: newUserId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 초대 성공 시 사용자 목록 다시 가져오기
      fetchDetails();
    } catch (error) {
      console.error('Invite Member error:', error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Room Detail</h1>
      <p>Room ID: {room.roomId}</p>
      <p>Room name: {room.roomName}</p>
      <p>Room master: {room.masterUser}</p>
      <Youtube youtubeTitle={'현재 재생 중인 플레이리스트'} youtubeURL={room.url} positionStyles={positionStyles} />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          {/* 멤버 초대하기 */}
          <Typography variant="h5" component="div" gutterBottom>
            Member 초대하기
          </Typography>
          <TextField
            label="User ID"
            variant="outlined"
            margin="normal"
            fullWidth
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleInviteUser}>
            초대하기
          </Button>

          {/* 멤버 불러오기 */}
          <Typography variant="h5" component="div" gutterBottom>
            참여 중인 Members
          </Typography>
          {members.map((member) => (
            <Paper key={member.id} elevation={3}>
              <Typography variant="h6" component="div" gutterBottom>
                {member.name}
              </Typography>
            </Paper>
          ))}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RoomDetail;
