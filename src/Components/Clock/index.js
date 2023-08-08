import { Tag } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {  db2 } from "../../Config/Firebase";
import { getIpLocal } from "../../Services/IpApi";


const Clock = ({ targetTime, loadApi }) => {

  const getKeyTimeUserCollectionRef = collection(db2, "keyTime");
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [dataKeyTimeOk, setDataKeyTimeOk] = useState([]);
  const fetchApi = async () => {
    const responseIp = await getIpLocal();
    const dataKeyTime = await getDocs(getKeyTimeUserCollectionRef);
    const dataDocAllKeyTime = dataKeyTime.docs
      .filter((dataFind) => dataFind.data().ip === responseIp.ip)
      .map((dataMap) => dataMap.data());
    setDataKeyTimeOk(dataDocAllKeyTime);
  };

  useEffect(() => {
    fetchApi();
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeRemaining === 0) {
    const DeleteOk = async () => {
      const keyTimeDoc = doc(db2, "keyTime", dataKeyTimeOk[0]?.id);
      try {
        await deleteDoc(keyTimeDoc);
        //Call back lại hàm khi người dùng getlink được nhưng time ===0
        loadApi(1);
      } catch {}
    };
    DeleteOk();
  }
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
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
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
