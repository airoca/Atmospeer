import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RoomDetail from './RoomDetail';
import CloseIcon from '@mui/icons-material/Close';

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
        { youtubeURL && <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' , border: '2px solid #553030' , backgroundColor: 'white'}}>
          <Typography variant="h5" component="div" gutterBottom style={{color: '#553030'}}>
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
          <Button variant="contained" color="grey" onClick={handleCreateAtmospeer}>
            만들기
          </Button>
        </Paper>
        }
        

        <div style={{ width: '100px', height: '50px' }}></div>
        <hr style={{ width: '100%' }} />
        <div style={{ width: '100px', height: '50px' }}></div>

        {/* 방장 정보 렌더링 */}
        <Typography variant="h5" component="div" gutterBottom>
          <strong>방장으로 참여 중인 AtmosPEER</strong>
        </Typography>
        {rooms.map((room) => (
          <Paper
            key={room.roomId}
            elevation={3}
            style={{
                display: 'flex',  // flex 레이아웃 사용
                justifyContent: 'space-between',  // 양 끝에 요소 정렬
                padding: '20px',
                marginBottom: '20px',
                cursor: 'pointer',
                backgroundImage: `url(${room.roomImage})`,  // Set background image
                backgroundSize: 'cover',  // Optional: Adjust background size to cover the element
              }}
            onClick={() => goToRoomDetail(room)}  // 클릭 시 RoomDetail 페이지로 이동
          >

            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px',
                height: '80px',
                background: 'linear-gradient(135deg, #f8f6f5, 30%, #f8f6f5)',
                boxShadow: '3px 3px 2px #808080',
                transform: 'rotate(10deg)',
                transformOrigin: 'top left'
              }}>
              <div style={{
                  position: 'absolute',
                  left: '5px',
                  width: '15px',
                  height: '12.5px'
                }}>
                <div style={{
                    position: 'absolute',
                    top: '4.5px',
                    left: '-2px',
                    width: '8.75px',
                    height: '8.75px',
                    borderRadius: '50%',
                    background: 'radial-gradient(#c9bf8d, 20%, rgba(201, 191, 141, 0))'
                  }}></div>
                <div style={{
                    position: 'absolute',
                    width: '1.25px',
                    height: '5px',
                    background: 'linear-gradient(to right, #808080, 40%, #eae8e8, 50%, #808080)',
                    borderRadius: '0 0 30% 30%',
                    transform: 'rotate(50deg)',
                    transformOrigin: 'bottom left',
                    top: '3.75px',
                    borderBottom: '1px solid #808080'
                  }}></div>
                <div style={{
                    position: 'absolute',
                    right: '3.75px',
                    width: '8.75px',
                    height: '8.75px',
                    borderRadius: '50%',
                    backgroundColor: '#9b2c0b',
                    background: 'radial-gradient(circle at bottom right, #c0786c, 25%, #4e0f04, 90%, #9b2c0b)'
                  }}></div>
              </div>
              <div style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "20px" }}>{room.roomName}</div>
            </div>

            <Button
              variant="contained"
              style={{
                backgroundColor: '#000000', // 연한 붉은색 바탕
                color: 'white', // 흰색 글씨
                borderRadius: '50%', // 원형 버튼
                width: '30px',  // 버튼의 너비
                height: '30px', // 버튼의 높이
                minWidth: '30px', // 최소 너비 설정
                padding: 0, // 내부 여백 제거
              }}
              onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRoom(room.roomId);
              }}
            >
            <CloseIcon />
            </Button>
          </Paper>
        ))}

        <div style={{ width: '100px', height: '50px' }}></div>
        <hr style={{ width: '100%' }} />
        <div style={{ width: '100px', height: '50px' }}></div>

        {/* 참가 정보 렌더링 */}
        <Typography variant="h5" component="div" gutterBottom>
          <strong>참가자로 참여 중인 AtmosPEER</strong>
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
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px',
                height: '80px',
                background: 'linear-gradient(135deg, #f8f6f5, 30%, #f8f6f5)',
                boxShadow: '3px 3px 2px #808080',
                transform: 'rotate(10deg)',
                transformOrigin: 'top left'
              }}>
              <div style={{
                  position: 'absolute',
                  left: '5px',
                  width: '15px',
                  height: '12.5px'
                }}>
                <div style={{
                    position: 'absolute',
                    top: '4.5px',
                    left: '-2px',
                    width: '8.75px',
                    height: '8.75px',
                    borderRadius: '50%',
                    background: 'radial-gradient(#c9bf8d, 20%, rgba(201, 191, 141, 0))'
                  }}></div>
                <div style={{
                    position: 'absolute',
                    width: '1.25px',
                    height: '5px',
                    background: 'linear-gradient(to right, #808080, 40%, #eae8e8, 50%, #808080)',
                    borderRadius: '0 0 30% 30%',
                    transform: 'rotate(50deg)',
                    transformOrigin: 'bottom left',
                    top: '3.75px',
                    borderBottom: '1px solid #808080'
                  }}></div>
                <div style={{
                    position: 'absolute',
                    right: '3.75px',
                    width: '8.75px',
                    height: '8.75px',
                    borderRadius: '50%',
                    backgroundColor: '#9b2c0b',
                    background: 'radial-gradient(circle at bottom right, #c0786c, 25%, #4e0f04, 90%, #9b2c0b)'
                  }}></div>
              </div>
              <div style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "20px" }}>{room.roomName}</div>
            </div>
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
