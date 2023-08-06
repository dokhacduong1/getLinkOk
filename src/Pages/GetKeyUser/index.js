import { Card, Select, Tag, message } from "antd";
import "./GetKeyUser.scss";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../Config/Firebase";
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

function GetKeyUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const getKeyCollectionRef = collection(db, "getKey");
  const getGameCollectionRef = collection(db, "gameManagement");
  const getLinkCollectionRef = collection(db, "linkManagement");
  const [dataSource, setDataSource] = useState([]);
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
          `Key Của Bạn Chọn Ngày Hôm Nay Đã Hết-${add5MinutesToCurrentTime(
            timeCookie
          )}`
        ),
        timeCookie
      );
    } else {
      setDataSource(dataDocAllKey[0]);
      setCookiePhut(
        "_Error",
        encryptStringNami(`${dataDocAllKey[0]?.key} & ${dataDocAllGame?.nameGame
          }-${add5MinutesToCurrentTime(timeCookie)}`)
        ,

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
  useEffect(() => {
    //checkLoad === 1 && checkLinkOk && getCookie("data") === ""
    const loadApi = async () => {
      const checkGame = await getSelectGame();
      const checkLinkOk = await checkLink();
      //Check xem có load lại web hay không
      const checkLoad = increaseReloadCount();

      if (checkLoad === 1 && checkLinkOk && getCookie("data") === "") {
        setDataSelect(checkGame);
        setStringNoti("Vui Lòng Chọn Game Muốn Lấy Key");
        setCheckSuccess(!checkSuccess);
        //
      } else {
        if (getCookie("_Error") !== "") {
          const helloHai = decryptStringNami(getCookie("_Error"))
          const arrayTime = helloHai.split("-") || getCookie("_Error");

          const targetTime2 = parseTimeToTargetDate(arrayTime[1]);
          arrayTime.push(targetTime2);

          setDataSource(arrayTime);
        } else {
          messageApi.open({
            type: "error",
            content: `Bạn Đã Cố Truy Cập Trái Phép Không Theo Tuần Tự Vui Lòng Get Link Lại!`,
          });
          setStringNoti("Vui Lòng Get Link Lại");
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

              <h1>Key Của Bạn Là</h1>
              <Tag color="red">{dataSource[0] || stringNoti}</Tag>
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
