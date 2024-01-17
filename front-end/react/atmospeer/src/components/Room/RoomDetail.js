import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Youtube from '../Youtube/Youtube';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import window from './window.png';
import tv from './television.png';
import teddybear from './teddybear.png';
import coffee from './coffee.png';

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
    <div >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1><div style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "60px", color: "#553030"}}>{room.roomName}</div></h1>
        <p><strong>방장: </strong>{room.masterUser}</p>
      </div>

      <div style={{ width: '100px', height: '50px' }}></div>

      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          {/* window.png */}
          <div style={{ position: 'absolute', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <img src={window} alt="Window" style={{ width: '500px', height: '500px' }} />
          </div>

          {/* room.roomImage */}
          <div style={{ position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <img
              src={room.roomImage}
              alt="Room Image"
              style={{ width: '490px', height: '460px', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>

        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          {/* TV 이미지 */}
          <div style={{ position: 'absolute', zIndex: 1, top: '50px', width: '100%', height: '100%' , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={tv} alt="Television" style={{ width: '800px', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* YouTube 컴포넌트 */}
          <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', ...positionStyles }}>
            <Youtube youtubeURL={room.url} positionStyles={positionStyles} />
          </div>
        </div>

        {/* 곰인형 이미지 */}
        <div style={{ position: 'absolute', zIndex: 1, top: '200px', left: '0px', width: '100%', height: '100%' }}>
          <img src={teddybear} alt="Television" style={{ width: '30%', height: '90%', pointerEvents: 'none' }} />
        </div>

        {/* 커피 이미지 */}
        <div style={{ position: 'absolute', zIndex: 1, top: '200px', left: '1150px', width: '100%', height: '100%' }}>
          <img src={coffee} alt="Television" style={{ width: '30%', height: '90%', pointerEvents: 'none' }} />
        </div>
      </div>

        


      <div style={{ width: '100px', height: '200px' }}></div>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">

          {/* 멤버 초대하기 */}
          <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', border: '2px solid #553030', backgroundColor: 'white' }}>
            <Typography variant="h5" component="div" gutterBottom style={{color: '#553030'}}>
              새로운 멤버 초대하기
            </Typography>
            <hr style={{ width: '100%' }} />
            <div style={{ width: '100px', height: '20px' }}></div>
            <TextField
              label="User ID"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
            />
            <Button variant="contained" color="grey" onClick={handleInviteUser}>
              초대하기
            </Button>
          </Paper>

          <div style={{ width: '100px', height: '30px' }}></div>

          {/* 멤버 불러오기 */}
          <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', border: '2px solid #553030' , backgroundColor: 'white'}}>
            <Typography variant="h5" component="div" gutterBottom>
              참여 중인 멤버
            </Typography>
            <hr style={{ width: '100%' }} />
            <div style={{ width: '100px', height: '20px' }}></div>
            {members.map((member) => (
              <Paper key={member.id} elevation={3}>
                <Typography 
                  variant="subtitle1" 
                  component="div" 
                  gutterBottom
                  style={{ 
                    fontWeight: 'bold', 
                    padding: '10px', // Adjust the padding as needed
                    fontSize: 'smaller' // Adjust the font size as needed
                  }}
                  >
                    😊 {member.name}
                </Typography>
              </Paper>
            ))}
          </Paper>
        </Container>
      </ThemeProvider>


      <div style={{ width: '100px', height: '100px' }}></div>
  </div>
);
};

export default RoomDetail;
