import React, { useState } from 'react';
import Youtube from '../Youtube/Youtube';
import Room from '../Room/Room';

export default function Chat({ userID }) {
  const [message, setMessage] = useState('');
  const [youtubeURL, setURL] = useState('');
  const [youtubeTitle, setTitle] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(message);

    try {
      const response = await fetch(`http://localhost:3001/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message + '해당 분위기에 어울리는 유튜브 플레이리스트의 키워드를 팝송, 케이팝, 재즈, 클래식이라는 키워드 중 하나와 함께 포함해서 설명 없이, 특수 문자를 제외하고, 한글로, 짧게 한 문장으로 적어줘' }),
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

      // youtube link
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
      console.log(youtubeURL);
      setURL(youtubeURL || 'N/A');
    } catch (error) {
      console.error('Error during fetch:', error);
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
      <div>사용자 ID: {userID}</div> {/* userID를 화면에 표시 */}
      <div style={{ width: '100px', height: '10px' }}></div>
      <form onSubmit={onSubmitHandler} style={{ textAlign: 'center' }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div style={{ width: '100px', height: '10px' }}></div>
        <button type='submit'>입력</button>
      </form>
      {/* <div>{youtubeURL}</div> */}
      
      <div style={{ width: '100px', height: '50px' }}></div>
      {/* youtube 영상 띄우기 */}
      {youtubeURL && (
        <div className="YoutubeContainer">
          {/* Youtube 영상 띄우기 */}
          {console.log(youtubeURL)}
          <Youtube youtubeTitle={youtubeTitle} youtubeURL={youtubeURL} positionStyles={positionStyles}/>
        </div>
      )}

      <div style={{ width: '100px', height: '50px' }}></div>
      {/* 소속되어 있는 room 띄우기 */}
      <Room userID={userID} youtubeURL={youtubeURL} />


      <div style={{ width: '100px', height: '50px' }}></div>
      <hr style={{ width: '80%' }} />
      <div style={{ width: '100px', height: '50px' }}></div>
      
    </div>
  );
}
