import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';  // 추가

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
  },
});

const Login = ({ onLoginSuccess }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [id, setID] = useState('');
  const [loginAttemptCount, setLoginAttemptCount] = useState(0);
  const navigate = useNavigate();  // 추가

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredID = e.target.id.value;
    setID(enteredID);
    const enteredPassword = e.target.pw.value;

    try {
      const response = await fetch(
        `http://localhost:3001/api/login?id=${encodeURIComponent(
          enteredID
        )}&password=${encodeURIComponent(enteredPassword)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.responseData);
      setIsSuccess(parsedData);
      setID(id);
      setLoginAttemptCount((prevCount) => prevCount + 1);

      if (parsedData) {
        onLoginSuccess(enteredID);
        navigate('/chat');  // 로그인 성공 시 Chat 페이지로 이동
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }}>
          <LockOutlinedIcon sx={{ borderRadius: '50%', bgcolor: '#553030', width: '2em', height: '2em', padding: '10px' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="id"
              autoComplete="id"
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'black', // 입력이 완료된 후의 테두리 색
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pw"
              label="Password"
              type="password"
              id="pw"
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'black', // 입력이 완료된 후의 테두리 색
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#553030',
                '&:hover': {
                  bgcolor: '#553030', // 버튼에 마우스를 올렸을 때의 배경 색상을 현재 색상으로 유지
                },
              }}
              >
              로그인
            </Button>
          </Box>

          {isSuccess ? (
            <Typography variant="body2" color="success.main">
              로그인에 성공했습니다.
            </Typography>
          ) : (
            <Typography variant="body2" color="error.main">
              {loginAttemptCount === 0 ? '' : '로그인에 실패했습니다.'}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
