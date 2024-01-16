import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RoomDetail from './RoomDetail';

const Room = ({ userID, youtubeURL, imgURL }) => {
  const theme = createTheme({ userID });
  const [rooms, setRooms] = useState([]);
  const [joiningRooms, setJoiningRooms] = useState([]);
  const [newAtmospeerName, setNewAtmospeerName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/myroom?masterUserId=${userID}`, {
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
          setRooms(responseData);
        }
      } catch (error) {
        console.error('Fetch Rooms error:', error.message);
      }
    };

    fetchRooms();
  }, [userID]);

  useEffect(() => {
    const fetchJoiningRooms = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/joiningroom?userId=${userID}`, {
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
          setJoiningRooms(responseData);
        }
      } catch (error) {
        console.error('Fetch Rooms error:', error.message);
      }
    };

    fetchJoiningRooms();
  }, [userID]);

  const positionStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  };

  const handleCreateAtmospeer = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/newroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masterUser: userID,
          url: youtubeURL,
          roomName: newAtmospeerName,
          roomImage: imgURL,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('AtmosPEER Created:', data);
    } catch (error) {
      console.error('Create AtmosPEER error:', error.message);
    }
  };

  // 방 디테일 페이지로 이동하는 함수
  const goToRoomDetail = (room) => {
    navigate(`/room/${room.roomId}`, { state: { room } });
  };

  // 방 삭제
  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/eraseroom/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Update the rooms state to reflect the deletion
      setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId));
      console.log('AtmosPEER Deleted:', roomId);
      
    } catch (error) {
      console.error('Delete AtmosPEER error:', error.message);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        { youtubeURL && <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5" component="div" gutterBottom>
            새로운 AtmosPEER 만들기
          </Typography>
          <TextField
            label="AtmosPEER 이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAtmospeerName}
            onChange={(e) => setNewAtmospeerName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCreateAtmospeer}>
            만들기
          </Button>
        </Paper>
        }
        

        <div style={{ width: '100px', height: '50px' }}></div>
        <hr style={{ width: '100%' }} />
        <div style={{ width: '100px', height: '50px' }}></div>

        {/* 방장 정보 렌더링 */}
        <Typography variant="h5" component="div" gutterBottom>
          방장으로 참여 중인 AtmosPEER
        </Typography>
        {rooms.map((room) => (
          <Paper
            key={room.roomId}
            elevation={3}
            style={{
                padding: '20px',
                marginBottom: '20px',
                cursor: 'pointer',
                backgroundImage: `url(${room.roomImage})`,  // Set background image
                backgroundSize: 'cover',  // Optional: Adjust background size to cover the element
              }}
            onClick={() => goToRoomDetail(room)}  // 클릭 시 RoomDetail 페이지로 이동
          >
            <Typography variant="h6" component="div" gutterBottom>
              {room.roomName}
            </Typography>
            <Button
            variant="contained"
            color="inherit"
            onClick={(e) => {
                e.stopPropagation();  // 이벤트 전파 막기
                handleDeleteRoom(room.roomId);
            }}
            >
            삭제
            </Button>
          </Paper>
        ))}

        <div style={{ width: '100px', height: '50px' }}></div>
        <hr style={{ width: '100%' }} />
        <div style={{ width: '100px', height: '50px' }}></div>

        {/* 참가 정보 렌더링 */}
        <Typography variant="h5" component="div" gutterBottom>
          참가자로 참여 중인 AtmosPEER
        </Typography>
        {joiningRooms.map((room) => (
          <Paper
            key={room.roomId}
            elevation={3}
            style={{
                padding: '20px',
                marginBottom: '20px',
                cursor: 'pointer',
                backgroundImage: `url(${room.roomImage})`,  // Set background image
                backgroundSize: 'cover',  // Optional: Adjust background size to cover the element
              }}
            onClick={() => goToRoomDetail(room)}  // 클릭 시 RoomDetail 페이지로 이동
          >
            <Typography variant="h6" component="div" gutterBottom>
              {room.roomName}
            </Typography>
            <Button
            variant="contained"
            color="inherit"
            onClick={(e) => {
                e.stopPropagation();  // 이벤트 전파 막기
                handleDeleteRoom(room.roomId);
            }}
            >
            삭제
            </Button>
          </Paper>
        ))}

        <Routes>
          {/* RoomDetail 페이지에 대한 라우트 */}
          <Route path="/room/:roomId" element={<RoomDetail />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default Room;
