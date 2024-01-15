import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Youtube from '../Youtube/Youtube';

const Room = ({ userID, youtubeURL }) => {
  const theme = createTheme({ userID });
  const [rooms, setRooms] = useState([]);

  // 해당 유저의 방 정보 가져오기
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
        console.log('Get Rooms Data: ', data);
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
  }, [userID]); // useEffect의 종속성에 userID 추가

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

        {/* 방 정보 렌더링 */}
        <Typography variant="h5" component="div" gutterBottom>
          방장으로 참여 중인 AtmosPEER
        </Typography>
        {rooms.map((room) => (
          <Paper key={room.roomId} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" component="div" gutterBottom>
              {room.masterUser}
            </Typography>
            {/*You YouTube 플레이어를 렌더링 */}
            {room.url.includes('youtube.com') ? (
              <Youtube youtubeTitle={'현재 재생 중인 플레이리스트'} youtubeURL={room.url} positionStyles={positionStyles} />
            ) : (
              <Typography variant="body1" component="div">
                Invalid YouTube URL
              </Typography>
            )}
          </Paper>
        ))}

      </Container>
    </ThemeProvider>
  );
};

export default Room;
