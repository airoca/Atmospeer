import React, { useState, useEffect } from 'react';
import Youtube from '../Youtube/Youtube';
import Room from '../Room/Room';
import TextField from '@mui/material/TextField';

export default function Chat({ userID }) {
  const [message, setMessage] = useState('');
  const [youtubeURL, setURL] = useState('');
  const [youtubeTitle, setTitle] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    // 페이지가 처음 마운트될 때와 unmount될 때 초기화 작업 수행
    return () => {
      setMessage('');
      setURL('');
      setTitle('');
      setImgURL('');
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(message);

    setLoading(true); // 로딩 시작

    // chatGPT + youtube link
    try {
      const response = await fetch(`http://localhost:3001/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message + '앞의 문장의 핵심 키워드를 뽑아 특수 문자를 포함하지 않은 \'~(하)ㄹ 때 듣는 음악 플레이리스트\'라는 형식으로 문장을 만들어서, 그 문장으로만 답해줘.' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // responseData에서 이스케이프 문자를 처리하고 JSON으로 파싱
      const unescapedData = data.responseData.replace(/\\n/g, '\n');
      const responseData = JSON.parse(unescapedData);

      // message에 해당하는 정보만 추출
      const messageContent = responseData?.choices?.[0]?.message?.content || 'N/A';
      console.log(messageContent);

      // youtube link 가져오기
      const response2 = await fetch(
        `http://localhost:3001/api/youtube?keyword=${encodeURIComponent(
          messageContent
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response2.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data2 = await response2.json();
      console.log('Youtube Data: ', data2.responseData);
      
      // Extracting title from responseData
      const titleMatch = data2.responseData.match(/Title: (.+?)\n/);
      const title = titleMatch ? titleMatch[1] : "N/A";
      setTitle(title);
      // Extracting the URL from responseData
      const youtubeURL =
        data2.responseData &&
        data2.responseData.match(/URL: (https:\/\/www\.youtube\.com\/watch\?v=[^\s]+)/)?.[1];
      setURL(youtubeURL || 'N/A');

    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }

    // chatGPT + image link
    try {
      setLoading(true); // 로딩 시작

      const response = await fetch(`http://localhost:3001/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message + '앞의 문장의 핵심 키워드를 하나 뽑아서 영어로 번역한 후 단어 하나로 답해줘. 부가적인 설명은 필요없어. 음악이나 노래와 관련된 단어는 제외해줘.' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // responseData에서 이스케이프 문자를 처리하고 JSON으로 파싱
      const unescapedData = data.responseData.replace(/\\n/g, '\n');
      const responseData = JSON.parse(unescapedData);

      // message에 해당하는 정보만 추출
      const messageContent = responseData?.choices?.[0]?.message?.content || 'N/A';
      console.log('gpt answer: ',messageContent);
      

      // image link 가져오기
      const response3 = await fetch(
        `http://localhost:3001/api/image?keyword=${encodeURIComponent(
          messageContent+' wallpaper'
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response3.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data3 = await response3.json();
      console.log('Image Data: ', data3.responseData);
      setImgURL(data3.responseData || 'N/A');

    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // youtube 플레이어를 가로축 정가운데로
  const positionStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  };

  return (
    <div className='Chat' style={positionStyles}>
      {loading && <div style={{color:'#553030'}}>Loading...</div>}

      <div style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "20px" }}>기분이 어떤가요? 무얼 하고 있나요? AtmosPEER에게 알려주세요!</div>
      <div style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "20px" }}>당신이 들으면 좋아할 유튜브 플레이리스트를 추천해줄게요!</div>
      <div style={{ width: '100px', height: '10px' }}></div>
      <form onSubmit={onSubmitHandler} style={{ textAlign: 'center' }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            width: '800px',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'black', // 입력이 완료된 후의 테두리 색
              },
            },
          }}
        ></TextField>
        <div style={{ width: '100px', height: '10px' }}></div>
        <button 
          type='submit'
          style={{ 
            backgroundColor: '#553030', // 버튼 배경색을 설정
            color: 'white', // 버튼의 글씨 색을 흰색으로 설정
            padding: '10px 20px', // 버튼의 패딩
            border: 'none', // 테두리 제거
            borderRadius: '5px', // 모서리 둥글게
            cursor: 'pointer', // 마우스 오버시 커서 변경
            marginTop: '12px', // 상단 여백
            marginBottom: '16px' // 하단 여백
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#553030'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#553030'}
        >
          입력
        </button>
      </form>
      <div style={{ width: '100px', height: '50px' }}></div>
      
      {loading && <div style={{color:'#553030'}}>Loading...</div>}

      {youtubeURL && (
        <div className="YoutubeContainer">
          <Youtube youtubeTitle={youtubeTitle} youtubeURL={youtubeURL} positionStyles={positionStyles}/>
        </div>
      )}

      <div style={{ width: '100px', height: '50px' }}></div>

      <Room userID={userID} youtubeURL={youtubeURL} imgURL={imgURL} />
    </div>
  );
}
