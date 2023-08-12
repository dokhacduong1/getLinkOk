import { Card, Select, Tag, message } from "antd";
import "./GetKeyUser.scss";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, db2 } from "../../Config/Firebase";
import { useEffect, useState } from "react";

import { increaseReloadCount } from "../../Helpers/countWeb";
import {

  getDataTime,

} from "../../Helpers/dataTime";
import Clock from "../../Components/Clock";
import load from "./images/load.png"
import { getIpLocal } from "../../Services/IpApi";

function GetKeyUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const getKeyCollectionRef = collection(db, "getKey");
  const getGameCollectionRef = collection(db, "gameManagement");
  const getLinkCollectionRef = collection(db, "linkManagement");

  const getKeyTimeUserCollectionRef = collection(db2, "keyTime");
  const [dataSource, setDataSource] = useState("");
  const [status, setStatus] = useState("Đang Load...");
  const [getIP, setGetIP] = useState("");
  const [dataSelect, setDataSelect] = useState([]);

  const [checkSuccess, setCheckSuccess] = useState(false);
  //Hàm này sẽ xử lý khi người dùng chọn game
  const fetchApiClick = async (idGame) => {
    const dataKey = await getDocs(getKeyCollectionRef);
    const dataGame = await getDocs(getGameCollectionRef);
    const newDocRefKeyTime = doc(getKeyTimeUserCollectionRef);
    const dataKeyTime = await getDataKey(getIP);
   
    if (!dataKeyTime.length > 0) {
      const dataDocAllGame = dataGame.docs
        .filter((dataFilter) => dataFilter.data().id === idGame)
        .map((dataMap) => dataMap.data())[0];

      const dataDocAllKey = dataKey.docs
        .filter((dataFilter) => dataFilter.data().idGame === idGame)
        .map((dataMap) => dataMap.data());
     
      if (dataDocAllKey.length === 0) {
        const dataOk = `Key Của Bạn Chọn Ngày Hôm Nay Đã Hết&${dataDocAllGame?.nameGame
          }`;
        const objectNew = {
          ip: getIP,
          id: newDocRefKeyTime.id,
          data: dataOk,
          date:getDataTime()
        };
        try {
          await setDoc(newDocRefKeyTime, objectNew);
        } catch { }
        setDataSource("Key Của Bạn Chọn Ngày Hôm Nay Đã Hết");
      } else {
        const dataOk = `${dataDocAllKey[0]?.key}&${dataDocAllGame?.nameGame
          }`;
        const objectNew = {
          ip: getIP,
          id: newDocRefKeyTime.id,
          data: dataOk,
          date:getDataTime()
        };
        try {
          await setDoc(newDocRefKeyTime, objectNew);
        } catch { }
        setDataSource(dataDocAllKey[0]);
      }
      //Mỗi lần dùng sẽ xóa key này
      if (dataDocAllKey.length > 0) {
        const keyDoc = doc(db, "getKey", dataDocAllKey[0]?.id);
        await deleteDoc(keyDoc);
      }
      setCheckSuccess(false);
    } else {
      messageApi.open({
        type: "error",
        content: `Không Tà Đạo Nha Bro! Đừng Mở 2 Tab Rồi Get Link Không Ổn Đâu`,
      });
    }
    //Tự Động Chuyển Trang Khi Tất Cả Đã Xong
    window.location.replace("https://www.vuitool.online/");
  };

  //Hàm Này Lôi Ra Cái Dữ Liệu Tên game Gán Cho Seleect
  const getSelectGame = async () => {
    const dataGame = await getDocs(getGameCollectionRef);

    const dataDocAllGame = dataGame.docs.map((dataMap) => ({
      value: dataMap.data()?.id,
      label: dataMap.data()?.nameGame,
    }));
    return dataDocAllGame;
  };
  //Hàm Này Check Link Trước Đó Xem Có Phải Link Chỉ Định Hay Không
  const checkLink = async () => {
    const dataLink = await getDocs(getLinkCollectionRef);
    const dataDocAllLink = dataLink.docs.map((dataMap) => dataMap.data()?.link);
    const checkUser = document.referrer;

    const checkOk = dataDocAllLink.some((dataSome) => dataSome === checkUser);

    return checkOk;
  };
  //Check xem key trên server ip này lấy chưa
  const getDataKey = async (ip) => {
    const dataKeyTime = await getDocs(getKeyTimeUserCollectionRef);
    const dataDocAllKeyTime = dataKeyTime.docs
      .filter((dataFind) => dataFind.data().ip === ip)
      .map((dataMap) => dataMap.data());
      
   dataDocAllKeyTime.forEach(async dataForEach=>{
      if(new Date(dataForEach.date) < new Date(getDataTime())){
        const keyTimeDoc = doc(db2, "keyTime", dataForEach.id);
        await deleteDoc(keyTimeDoc);
        window.location.replace("https://www.vuitool.online/");
      }
   })
    return dataDocAllKeyTime;
  };
  const loadApi = async () => {
    const checkGame = await getSelectGame();
    const checkLinkOk = await checkLink();
    //Check xem có load lại web hay không
    const checkLoad = await increaseReloadCount();
    const responseIp = await getIpLocal();
    const dataKeyTime = await getDataKey(responseIp.ip);

    if (!dataKeyTime.length > 0 && checkLinkOk && checkLoad === 1) {
      setDataSelect(checkGame);
     
      setDataSource("Vui Lòng Chọn Game");
      setCheckSuccess(!checkSuccess);
      setGetIP(responseIp.ip);
      //
    } else {
      if (dataKeyTime.length > 0) {
        const arrayTime = dataKeyTime[0].data;
       console.log(arrayTime)
        setDataSource(arrayTime);
        setStatus("Chưa Thể Get Link Mới");
      } else {
        setStatus("Sẵn Sàng Get Link Mới");
        messageApi.open({
          type: "error",
          content: `Bạn Đã Truy Cập Không Đúng Trình Tự Vui Lòng Get Link Và Thử Lại!`,
        });
        setDataSource("Vui Lòng Get Link Và Thử Lại");
      
      }
    }
  };
  useEffect(() => {
    //checkLoad === 1  && checkLinkOk && getCookie("data") === ""
    loadApi();
  }, []);

  const handleClick = async (value) => {
    fetchApiClick(value);
    setCheckSuccess(false);
  };

  return (
    <>
      {contextHolder}
      <div className="getKeyUser">
        <Card className="getKeyUser__card">
          {dataSource !== "" ? (
            <>
              
              <h2>Trạng Thái</h2> <Tag color="#cd201f"><strong>{status}</strong></Tag>

              <h1>
                Key Game{" "}
                {dataSource.length > 1 ? dataSource.split("&")[1] : ""} Của
                Bạn Là
              </h1>
              <Tag color="red">
                {dataSource.length > 1
                  && dataSource?.split("&")[0]
                  }
              </Tag>
              {checkSuccess && (
                <>
                  <Select
                    onChange={handleClick}
                    options={dataSelect}
                    style={{ width: 170 }}
                    placeholder="Tên Game"
                    className="search__welcome-form-select"
                  />
                </>
              )}
              {dataSource.length > 1 && (
                <>
                  <Clock />
                </>
              )}
              <p>
                <strong>Lưu Ý:</strong> Mỗi Ngày Sẽ Được Get 1 Key,Nghĩa Là Cứ Qua 0h Ngày Hôm Sau Hệ Thống Sẽ Reset Bạn Mới Được Get Lại Key
                
              </p>
             
              <p ><strong>Khi Đã Qua Ngày Mới Vui Lòng Load Lại Trang</strong> Để Nó Nhận Diện Ngày Mới Rồi Lúc Đó Mới Được Get Link Không Thì  <strong style={{fontSize:"15px"}}>Get Lần 2 Thì Tự Chịu</strong> <br/> Luôn Phải Để Ý Trạng Thái Là "<strong><i>Sẵn Sàng Get Link Mới</i></strong>" Lúc Đó Bạn Mới Được Get Link </p>
              <p>Có Thể Xem "<strong>Thời Gian Đếm Ngược</strong>" Để Căn Giờ Được Lấy Key</p>
            </>
          ):(<><img style={{width:"300px"}} src={load} alt="load" ></img></>)}
        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
