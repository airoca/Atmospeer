const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const axios = require('axios');
const http = require('http');
const port = 3001;
const cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// 모든 유저 정보 가져오기
app.get('/api/user', (req, res) => {
  const options = {
    hostname: '192.249.29.126',
    port: 8080,
    path: '/users',
    method: 'GET'
  };

  const externalReq = http.request(options, (externalRes) => {
    let data = '';

    externalRes.on('data', (chunk) => {
      data += chunk;
    });

    externalRes.on('end', () => {
      // 받은 데이터를 다시 클라이언트에게 응답
      res.json({ responseData: data });
      console.log(data);
    });
  });

  externalReq.end();
});
4192
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

// 로그인
app.get('/api/login', (req, res) => {
    console.log("Received POST request");

    const id = req.query.id;
    const password = req.query.password;

    const options = {
        hostname: '192.249.29.126',
        port: 8080,
        path: `/login?id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const externalReq = http.request(options, (externalRes) => {
        let data = '';

        externalRes.on('data', (chunk) => {
            data += chunk;
        });

        externalRes.on('end', () => {
            // 받은 데이터를 다시 클라이언트에게 응답
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ responseData: data }));
        });
    });

    // 오류 처리
    externalReq.on('error', (error) => {
        console.error(`Error in external request: ${error.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    });

    // 요청 종료
    externalReq.end();
});

// 회원가입
app.post('/api/register', (req, res) => {
  console.log(req.body);

  const options = {
      hostname: '192.249.29.126',
      port: 8080,
      path: '/register',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
  };

  const externalReq = http.request(options, (externalRes) => {
      let data = '';

      externalRes.on('data', (chunk) => {
          data += chunk;
      });

      externalRes.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ responseData: data }));
      });
  });

  externalReq.on('error', (error) => {
      console.error(`External request error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
  });

  externalReq.write(JSON.stringify(req.body));
  externalReq.end();
});

// 채팅: 메시지 보내기
app.post('/api/send', (req, res) => {
  const options = {
      hostname: '192.249.29.126',
      port: 8080,
      path: '/send',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
  };

  const externalReq = http.request(options, (externalRes) => {
      let data = '';

      externalRes.on('data', (chunk) => {
          data += chunk;
      });

      externalRes.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ responseData: data }));
      });
  });

  externalReq.on('error', (error) => {
      console.error(`External request error: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
  });

  externalReq.write(JSON.stringify(req.body));
  externalReq.end();
});

// youtube link 받아 오기
app.get('/api/youtube', (req, res) => {
    console.log("Received POST request");

    const message = req.query.keyword;
    const options = {
        hostname: '192.249.29.126',
        port: 8080,
        path: `/youtube?keyword=${encodeURIComponent(message)}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const externalReq = http.request(options, (externalRes) => {
        let data = '';

        externalRes.on('data', (chunk) => {
            data += chunk;
        });

        externalRes.on('end', () => {
            // 받은 데이터를 다시 클라이언트에게 응답
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ responseData: data }));
        });
    });

    // 오류 처리
    externalReq.on('error', (error) => {
        console.error(`Error in external request: ${error.message}`);
        res.end('Internal Server Error');
    });

    // 요청 종료
    externalReq.end();
});

// image link 받아 오기
app.get('/api/image', (req, res) => {
    console.log("Received GET image request");

    const message = req.query.keyword;
    console.log('Image link query: ', message);
    const options = {
        hostname: '192.249.29.126',
        port: 8080,
        path: `/image?keyword=${encodeURIComponent(message)}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const externalReq = http.request(options, (externalRes) => {
        let data = '';

        externalRes.on('data', (chunk) => {
            data += chunk;
        });

        externalRes.on('end', () => {
            // 받은 데이터를 다시 클라이언트에게 응답
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ responseData: data }));
        });
    });

    // 오류 처리
    externalReq.on('error', (error) => {
        console.error(`Error in external request: ${error.message}`);
        res.end('Internal Server Error');
    });

    // 요청 종료
    externalReq.end();
});

// 새로운 방 만들기
app.post('/api/newroom', (req, res) => {
  
    const options = {
        hostname: '192.249.29.126',
        port: 8080,
        path: '/newroom',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
  
    const externalReq = http.request(options, (externalRes) => {
        let data = '';
  
        externalRes.on('data', (chunk) => {
            data += chunk;
        });
  
        externalRes.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ responseData: data }));
        });
    });
  
    externalReq.on('error', (error) => {
        console.error(`External request error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    });
  
    externalReq.write(JSON.stringify(req.body));
    externalReq.end();
  });

// 특정 user가 방장인 모든 방 정보 가져오기
app.get('/api/myroom', (req, res) => {
    const masterUserID = req.query.masterUserId;
    console.log('Master User ID: ', masterUserID);
    const options = {
      hostname: '192.249.29.126',
      port: 8080,
      path: `/myroom?masterUserId=${encodeURIComponent(masterUserID)}`,
      method: 'GET'
    };
  
    const externalReq = http.request(options, (externalRes) => {
      let data = '';
  
      externalRes.on('data', (chunk) => {
        data += chunk;
      });
  
      externalRes.on('end', () => {
        // 받은 데이터를 다시 클라이언트에게 응답
        res.json({ responseData: data });
        console.log(data);
      });
    });
  
    externalReq.end();
  });

  // 특정 user가 소속된 모든 방 정보 가져오기
app.get('/api/joiningroom', (req, res) => {
    const userId = req.query.userId;
    console.log('User ID: ', userId);
    const options = {
      hostname: '192.249.29.126',
      port: 8080,
      path: `/joiningroom?userId=${encodeURIComponent(userId)}`,
      method: 'GET'
    };
  
    const externalReq = http.request(options, (externalRes) => {
      let data = '';
  
      externalRes.on('data', (chunk) => {
        data += chunk;
      });
  
      externalRes.on('end', () => {
        // 받은 데이터를 다시 클라이언트에게 응답
        res.json({ responseData: data });
        console.log(data);
      });
    });
  
    externalReq.end();
  });

// 방 삭제하기
app.delete('/api/eraseroom/:roomId', (req, res) => {
    const roomId = req.params.roomId;  // Use req.params to get the parameter from the URL
    console.log('Room ID: ', roomId);
    const options = {
      hostname: '192.249.29.126',
      port: 8080,
      path: `/eraseroom/${roomId}`,
      method: 'DELETE',
    };
  
    const externalReq = http.request(options, (externalRes) => {
      let data = '';
  
      externalRes.on('data', (chunk) => {
        data += chunk;
      });
  
      externalRes.on('end', () => {
        // 받은 데이터를 다시 클라이언트에게 응답
        res.json({ responseData: data });
        console.log(data);
      });
    });
  
    externalReq.end();
  });
  
// member 목록 불러오기
app.get('/api/members', (req, res) => {
    const roomId = req.query.roomId;
    const options = {
      hostname: '192.249.29.126',
      port: 8080,
      path: `/members?roomId=${roomId}`,
      method: 'GET'
    };
  
    const externalReq = http.request(options, (externalRes) => {
      let data = '';
  
      externalRes.on('data', (chunk) => {
        data += chunk;
      });
  
      externalRes.on('end', () => {
        // 받은 데이터를 다시 클라이언트에게 응답
        res.json({ responseData: data });
        console.log('Members data: ', data);
      });
    });
  
    externalReq.end();
  });

// member 초대하기
app.post('/api/joinroom', (req, res) => {
  
    const options = {
        hostname: '192.249.29.126',
        port: 8080,
        path: '/joinroom',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
  
    const externalReq = http.request(options, (externalRes) => {
        let data = '';
  
        externalRes.on('data', (chunk) => {
            data += chunk;
        });
  
        externalRes.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ responseData: data }));
        });
    });
  
    externalReq.on('error', (error) => {
        console.error(`External request error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    });
  
    externalReq.write(JSON.stringify(req.body));
    externalReq.end();
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
