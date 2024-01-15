import React from 'react';

export default function Youtube({ youtubeURL }) {
    // YouTube API Key
    const apiKey = '';
  
    // 동영상 ID 추출
    const videoId = youtubeURL.split('v=')[1];
  
    // YouTube 동영상 URL 생성
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div className='Youtube'>
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
