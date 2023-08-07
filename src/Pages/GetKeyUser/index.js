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
import {
  encodeNumberToBase,
  increaseReloadCount,
} from "../../Helpers/countWeb";
import {
  add5MinutesToCurrentTime,
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
  const getBlockUserCollectionRef = collection(db2, "blockUser");
  const [dataSource, setDataSource] = useState([]);
  const [dataIp, setDataIp] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [stringNoti, setStringNoti] = useState("Đang Load...");
  const [checkSuccess, setCheckSuccess] = useState(false);
  const fetchApiClick = async (idGame) => {
    const dataKey = await getDocs(getKeyCollectionRef);
    const dataGame = await getDocs(getGameCollectionRef);

    const dataDocAllGame = dataGame.docs
      .filter((dataFilter) => dataFilter.data().id === idGame)
      .map((dataMap) => dataMap.data())[0];

    const dataDocAllKey = dataKey.docs
      .filter((dataFilter) => dataFilter.data().idGame === idGame)
      .map((dataMap) => dataMap.data());
    const timeCookie = 5;
    if (dataDocAllKey.length === 0) {
      setDataSource("Key Của Bạn Chọn Ngày Hôm Nay Đã Hết");
      setCookiePhut(
        "_Error",
        encryptStringNami(
          `Key Của Bạn Chọn Ngày Hôm Nay Đã Hết&${dataDocAllGame?.nameGame
          }-${add5MinutesToCurrentTime(timeCookie)}`
        ),
        timeCookie
      );
    } else {
      setDataSource(dataDocAllKey[0]);
      setCookiePhut(
        "_Error",
        encryptStringNami(
          `${dataDocAllKey[0]?.key}&${dataDocAllGame?.nameGame
          }-${add5MinutesToCurrentTime(timeCookie)}`
        ),
        timeCookie
      );
    }

    if (dataDocAllKey.length > 0) {
      const keyDoc = doc(db, "getKey", dataDocAllKey[0]?.id);
      await deleteDoc(keyDoc);
    }
    setCheckSuccess(false);
    window.location.href = "https://www.vuitool.online/";
  };

  const getSelectGame = async () => {
    const dataGame = await getDocs(getGameCollectionRef);

    const dataDocAllGame = dataGame.docs.map((dataMap) => ({
      value: dataMap.data()?.id,
      label: dataMap.data()?.nameGame,
    }));
    return dataDocAllGame;
  };
  //lấy link
  const checkLink = async () => {
    const dataLink = await getDocs(getLinkCollectionRef);
    const dataDocAllLink = dataLink.docs.map((dataMap) => dataMap.data()?.link);
    const checkUser = document.referrer;
    const checkOk = dataDocAllLink.some((dataSome) => dataSome === checkUser);
    return checkOk;
  };
  const checkIpAllUser = async (ip) => {
    const dataIp = await getDocs(getBlockUserCollectionRef);
    const dataDocAllIp = dataIp.docs.some(
      (dataEvery) => dataEvery.data().ip === ip
    );
    return dataDocAllIp;
  };
  useEffect(() => {
    //checkLoad === 1 && checkLinkOk && getCookie("data") === ""
    const loadApi = async () => {
      const checkGame = await getSelectGame();
      const checkLinkOk = await checkLink();
      //Check xem có load lại web hay không
      const checkLoad = increaseReloadCount();
      const responseIp = await getIpLocal();
      const checkIp = await checkIpAllUser(responseIp.ip);
      if (
        checkLoad === 1 &&
        !checkIp &&
        checkLinkOk &&
        getCookie("data") === ""
      ) {
        setDataSelect(checkGame);
        setStringNoti("Vui Lòng Chọn Game Muốn Lấy Key");
        setCheckSuccess(!checkSuccess);
        //
      } else {
        if (getCookie("_Error") !== "") {
          const helloHai = decryptStringNami(getCookie("_Error"));
          const arrayTime = helloHai.split("-") || getCookie("_Error");
          if (checkIp) {
            console.log("ok")
            messageApi.open({
              type: "error",
              content: `Bạn Đã Bị Cấm!`,
            });
            setStringNoti("Bạn Đã Bị Cấm Vào Web Khi Có Ý Đồ Bất Chính");
          }
          else if (arrayTime.length > 1) {
            const targetTime2 = parseTimeToTargetDate(arrayTime[1]);
            arrayTime.push(targetTime2);
            setDataSource(arrayTime);
          } else {
            //Đoạn này sẽ block ip khi cố tình chỉnh sửa

            const newDocRefBlockUser = doc(getBlockUserCollectionRef);
            const objectNew = {
              ip: responseIp.ip,
              id: newDocRefBlockUser.id,
            };
            try {
              await setDoc(newDocRefBlockUser, objectNew);
            } catch { }
            messageApi.open({
              type: "error",
              content: `Vui Lòng Đừng Chỉnh Linh Tinh!`,
            });
            setStringNoti("Vui Lòng Không Có Ý Đồ Bất Chính");
          }
        }
        else if (checkIp) {

          messageApi.open({
            type: "error",
            content: `Bạn Đã Bị Cấm!`,
          });
          setStringNoti("Bạn Đã Bị Cấm Vào Web Khi Có Ý Đồ Bất Chính");
        }
        else {
          setStringNoti("Vui Lòng Get Link Và Thử Lại");
          messageApi.open({
            type: "error",
            content: `Bạn Đã Truy Cập Không Đúng Trình Tự Vui Lòng Get Link Và Thử Lại!`,
          });
        }
      }
    };
    loadApi();
  }, []);

  const targetTime = new Date();
  targetTime.setMinutes(targetTime.getMinutes() + 5);

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
