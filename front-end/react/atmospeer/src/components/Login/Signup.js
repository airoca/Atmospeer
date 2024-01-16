import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
  },
});

export default function Signup() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [signupAttemptCount, setSignupAttemptCount] = useState(0);

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const password = e.target.pw.value;
        const name = e.target.name.value;
        
        const userInput = {
            id: id,
            password: password,
            name: name,
        };

        try {
            const response = await fetch(`http://localhost:3001/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const parsedData = JSON.parse(data.responseData);
            setIsSuccess(parsedData);
            setSignupAttemptCount((prevCount) => prevCount + 1);
            console.log('Signup Data: ', parsedData);
            
            if (parsedData) {
              navigate('/login');
          }

        } catch (error) {
            console.error('Error during fetch:', error);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon sx={{ borderRadius: '50%', bgcolor: '#553030', width: '2em', height: '2em', padding: '10px' }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
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
                    <TextField
                         margin="normal"
                         required
                         fullWidth
                         name="name"
                         label="Name"
                         type="text"
                         id="name"
                         autoComplete="name"
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
                      회원가입
                    </Button>
                  </Box>
                  {isSuccess ? (
                    <Typography variant="body2" color="success.main">
                    회원가입에 성공했습니다.
                    </Typography>
                    ) : (
                    <Typography variant="body2" color="error.main">
                    {signupAttemptCount === 0 ? '' : '회원가입에 실패했습니다.'}
                    </Typography>
                  )}
                  </Box>
                </Container>
              </ThemeProvider>
  );
}