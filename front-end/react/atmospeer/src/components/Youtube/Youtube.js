import React from 'react';

export default function Youtube({ youtubeTitle, youtubeURL, positionStyles }) {
    // YouTube API Key
    const apiKey = '';
  
    // 동영상 ID 추출a
    const videoId = youtubeURL.split('v=')[1];
  
    // YouTube 동영상 URL 생성
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div className='Youtube' style={positionStyles}>
        <div className='YoutubeTitle'>
          추천 플레이리스트: {youtubeTitle}
        </div>
        <div style={{ width: '100px', height: '10px' }}></div>
        {youtubeURL !== 'N/A' && (
          <iframe
            width='560'
            height='315'
            src={embedUrl}
            title='YouTube video player'
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  }
