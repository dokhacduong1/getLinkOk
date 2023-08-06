import { Tag } from 'antd';
import React, { useState, useEffect } from 'react';


const Clock = ({ targetTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    function calculateTimeRemaining() {
      const now = new Date();
      const target = new Date(targetTime);
      const remainingTime = target - now;
      return remainingTime > 0 ? remainingTime : 0;
    }
  
    function formatTime(milliseconds) {
      const seconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  
    return (
      <div className="countdown-timer">
        <div style={{padding:"10px 0"}} className="time-remaining"><span><i>Thời Gian Đếm Ngược</i></span> <Tag>{formatTime(timeRemaining)}</Tag></div>
      </div>
    );
};

export default Clock;