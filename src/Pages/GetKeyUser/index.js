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
import { getCookie, setCookiePhut } from "../../Helpers/cookie";
import { increaseReloadCount } from "../../Helpers/countWeb";
import {
  add5MinutesToCurrentTime,
  getDataTime,
  parseTimeToTargetDate,
} from "../../Helpers/dataTime";
import Clock from "../../Components/Clock";
import {
  decryptStringNami,
  encryptStringNami,
} from "../../Helpers/decodeString";
import { getIpLocal } from "../../Services/IpApi";

function GetKeyUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const getKeyCollectionRef = collection(db, "getKey");
  const getGameCollectionRef = collection(db, "gameManagement");
  const getLinkCollectionRef = collection(db, "linkManagement");

  const getKeyTimeUserCollectionRef = collection(db2, "keyTime");
  const [dataSource, setDataSource] = useState([]);

  const [dataSelect, setDataSelect] = useState([]);
  const [stringNoti, setStringNoti] = useState("Đang Load...");
  const [checkSuccess, setCheckSuccess] = useState(false);
  //Hàm này sẽ xử lý khi người dùng chọn game
  const fetchApiClick = async (idGame) => {
    const dataKey = await getDocs(getKeyCollectionRef);
    const dataGame = await getDocs(getGameCollectionRef);
    const newDocRefKeyTime = doc(getKeyTimeUserCollectionRef);
    const responseIp = await getIpLocal();

    const dataDocAllGame = dataGame.docs
      .filter((dataFilter) => dataFilter.data().id === idGame)
      .map((dataMap) => dataMap.data())[0];

    const dataDocAllKey = dataKey.docs
      .filter((dataFilter) => dataFilter.data().idGame === idGame)
      .map((dataMap) => dataMap.data());
    const timeCookie = 5;
    if (dataDocAllKey.length === 0) {
      const dataOk = `Key Của Bạn Chọn Ngày Hôm Nay Đã Hết&${dataDocAllGame?.nameGame
        }-${add5MinutesToCurrentTime(timeCookie)}}`
      const objectNew = {
        ip: responseIp.ip,
        id: newDocRefKeyTime.id,
        data: dataOk
      };
      try {
        await setDoc(newDocRefKeyTime, objectNew);
      } catch { }
      setDataSource("Key Của Bạn Chọn Ngày Hôm Nay Đã Hết");

    } else {
      const dataOk = `${dataDocAllKey[0]?.key}&${dataDocAllGame?.nameGame
        }-${add5MinutesToCurrentTime(timeCookie)}}`
      const objectNew = {
        ip: responseIp.ip,
        id: newDocRefKeyTime.id,
        data: dataOk
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
    //Tự Động Chuyển Trang Khi Tất Cả Đã Xong
    window.location.replace("https://www.vuitool.online/")
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
    const dataDocAllKeyTime = dataKeyTime.docs.filter((dataFind) => dataFind.data().ip === ip).map(dataMap => dataMap.data());
    return dataDocAllKeyTime
  }
  useEffect(() => {
    //checkLoad === 1  && checkLinkOk && getCookie("data") === ""
    const loadApi = async () => {
      const checkGame = await getSelectGame();
      const checkLinkOk = await checkLink();
      //Check xem có load lại web hay không
      const checkLoad = increaseReloadCount();
      const responseIp = await getIpLocal();
      const dataKeyTime = await getDataKey(responseIp.ip)
      if (
        !dataKeyTime.length > 0 && checkLinkOk && checkLoad === 1
      ) {

        setDataSelect(checkGame);
        setStringNoti("Vui Lòng Chọn Game Muốn Lấy Key");
        setCheckSuccess(!checkSuccess);
        //
      } else {
        if (dataKeyTime.length > 0) {
          const arrayTime = dataKeyTime[0].data.split("-") || ""
          const targetTime = parseTimeToTargetDate(arrayTime[1]);

          arrayTime.push(targetTime);
          setDataSource(arrayTime);
        }
        else {
          messageApi.open({
            type: "error",
            content: `Bạn Đã Truy Cập Không Đúng Trình Tự Vui Lòng Get Link Và Thử Lại!`,
          });
          setStringNoti("Vui Lòng Get Link Và Thử Lại");
        }
      }



    };
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
          {dataSource && (
            <>
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

              <h1>
                Key Game{" "}
                {dataSource.length > 1 ? dataSource[0].split("&")[1] : ""} Của
                Bạn Là
              </h1>
              <Tag color="red">
                {dataSource.length > 1
                  ? dataSource[0].split("&")[0]
                  : stringNoti}
              </Tag>
              {dataSource.length > 1 && (
                <>
                  <Clock targetTime={dataSource[2]} />
                </>
              )}
              <p>
                <strong>Lưu Ý:</strong> Không Được Get Nhiều Key Dưới 5 Phút
              </p>
              <p> Qua 5 Phút Muốn Lấy Lại Key Vui Lòng Get Link Rút Gọn Lại</p>
              <p>
                {" "}
                Key Sẽ Luôn Được Lưu Trong Vòng <strong>5 Phút</strong> không
                thể lấy thêm key game mới trong thời gian này
              </p>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
