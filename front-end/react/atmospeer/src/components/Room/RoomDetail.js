// RoomDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Youtube from '../Youtube/Youtube';

const RoomDetail = () => {
  const { state } = useLocation();
  const room = state?.room;

  if (!room) {
    return <p>No room data available</p>;
  }

  const containerStyle = {
    backgroundImage: `url(${room.roomImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  const positionStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  };


  return (
    <div style={containerStyle}>
      <h1>Room Detail</h1>
      <p>Room ID: {room.roomId}</p>
      <p>Room name: {room.roomName}</p>
      <p>Room master: {room.masterUser}</p>
      <Youtube youtubeTitle={'현재 재생 중인 플레이리스트'} youtubeURL={room.url} positionStyles={positionStyles} />

      {/* 멤버 불러오기 */}
    </div>
  );
};

export default RoomDetail;
