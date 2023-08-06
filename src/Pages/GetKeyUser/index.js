import { Card, Select, Tag, message } from "antd";
import "./GetKeyUser.scss";
import { FloatButton } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useEffect, useState } from "react";
import { getCookie, setCookiePhien, setCookiePhut } from "../../Helpers/cookie";
import {
  decodeString,
  encodeNumberToBase,
  increaseReloadCount,
} from "../../Helpers/countWeb";

function GetKeyUser() {
  var reloadCount = localStorage.getItem("reloadCount");
  const [messageApi, contextHolder] = message.useMessage();
  const getKeyCollectionRef = collection(db, "getKey");
  const getGameCollectionRef = collection(db, "gameManagement");
  const getLinkCollectionRef = collection(db, "linkManagement");
  const [dataSource, setDataSource] = useState([]);
  const [dataLink, setDataLink] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [stringNoti, setStringNoti] = useState("Lỗi Key Vui Lòng Get Link Lại");
  const [checkSuccess, setCheckSuccess] = useState(false);
  const fetchApiClick = async (idGame) => {
    const dataKey = await getDocs(getKeyCollectionRef);

    const dataDocAllKey = dataKey.docs
      .filter((dataFilter) => dataFilter.data().idGame === idGame)
      .map((dataMap) => dataMap.data());

    if (dataDocAllKey.length === 0) {
      setDataSource({ key: "Key Ngày Hôm Nay Đã Hết" });
    } else {
      setDataSource(dataDocAllKey[0]);
    }

    setCookiePhut("referrer", document.referrer, 5);
    if (dataDocAllKey.length > 0) {
      const keyDoc = doc(db, "getKey", dataDocAllKey[0]?.id);
      await deleteDoc(keyDoc);
    }
    setCheckSuccess(false);
  };

  // Tăng số lượng tải lại sau mỗi lần load

  const fetchApi2 = async () => {
    const dataGame = await getDocs(getGameCollectionRef);
   
    const dataDocAllGame = dataGame.docs
      .filter(
        (dataFilter) => dataFilter.data().uidUser === auth?.currentUser?.uid
      )
      .map((dataMap) => ({
        value: dataMap.data()?.id,
        label: dataMap.data()?.nameGame,
      }));
    setDataSelect(dataDocAllGame);

  };
  const checkLink = async () => {
    const dataLink = await getDocs(getLinkCollectionRef);
    const dataDocAllLink = dataLink.docs.map((dataMap) => dataMap.data()?.link);
    const checkUser = document.referrer;
    const checkOk = dataDocAllLink.some((dataSome) => dataSome === checkUser);
   return checkOk
  }
  useEffect(() => {
    //coutLoad === 1 && checkOk && getCookie("referrer") === ""
    const loadApi = async ()=>{
      const checkLinkOk = await checkLink()
      console.log(checkLinkOk)
      const coutLoad = increaseReloadCount();
    
      
      if (coutLoad === 1 && checkLinkOk && getCookie("referrer") === "") {
        fetchApi2();
        setStringNoti("Vui Lòng Chọn Game Muốn Lấy Key");
        setCheckSuccess(!checkSuccess);
      } else {
        messageApi.open({
          type: "error",
          content: `Bạn Đã Cố Truy Cập Hoặc Đã Lấy Key Rồi Vui Lòng Ấn Lại Link Rút Gọn Và Thử Lại`,
        });
      }
    }
    loadApi()
   
  }, []);

  const handleClick = async (value) => {
    fetchApiClick(value);
    setCheckSuccess(false)
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
              <Tag color="red">{dataSource?.key || stringNoti}</Tag>
              <p>
                <strong>Lưu Ý:</strong> Không Được Get Nhiều Key Dưới 5 Phút
              </p>
              <p> Qua 5 Phút Muốn Lấy Lại Key Vui Lòng Get Link Rút Gọn Lại</p>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
