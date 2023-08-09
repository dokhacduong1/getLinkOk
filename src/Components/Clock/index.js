import { Tag } from "antd";

import React, { useState, useEffect } from "react";

const Clock = () => {
  const [timeRemaining, setTimeRemaining] = useState();

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 1, 0, 0); // Set to 0h 1m 0s 0ms of the next day

    const interval = setInterval(() => {
      const remainingTime = tomorrow - new Date();
      setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  // Rest of your component code...
  if (timeRemaining === 0) {
    window.location.replace("https://www.vuitool.online/");
  }
  return (
    <>
      <div className="countdown-timer">
        <div style={{ padding: "10px 0" }} className="time-remaining">
          <span>
            <i>Thời Gian Đếm Ngược</i>
          </span>{" "}
          <Tag>{formatTime(timeRemaining)}</Tag>
        </div>
      </div>
    </>
  );
};

export default Clock;
