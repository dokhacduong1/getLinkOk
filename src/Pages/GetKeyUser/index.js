import { Card, Tag } from "antd";
import "./GetKeyUser.scss";
import { FloatButton } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useEffect, useState } from "react";
import { getCookie, setCookiePhien, setCookiePhut } from "../../Helpers/cookie";
import { decodeString, encodeNumberToBase, increaseReloadCount } from "../../Helpers/countWeb";

function GetKeyUser() {
  var reloadCount = localStorage.getItem('reloadCount');
  const getKeyCollectionRef = collection(db, "getKey");
  const [dataSource, setDataSource] = useState([]);
  const fetchApi = async () => {

    const data = await getDocs(getKeyCollectionRef);
    const dataDocAllKey = data.docs.map((dataMap) => dataMap.data());
    setDataSource(dataDocAllKey[0]);
    // setCookiePhut("referrer",document.referrer,1)
    setCookiePhien("referrer", document.referrer)
    const keyDoc = doc(db, "getKey", dataDocAllKey[0].id);
    await deleteDoc(keyDoc);
  };

  // Tăng số lượng tải lại sau mỗi lần load

  




  useEffect(() => {


    const coutLoad = increaseReloadCount()
    const checkUser = document.referrer
    const link = ["https://dilink.net/", "https://beelink.life/"]
    const checkOk = link.some(dataSome => dataSome === checkUser)
    if (coutLoad === 1 && checkOk && getCookie("referrer") === "") {

      fetchApi();
    } else {
      console.log("sai")
    }

  }, []);



  return (
    <>
      <div className="getKeyUser">
        <Card className="getKeyUser__card">
          {
            dataSource && <>
              <h1>Key Của Bạn Là</h1>
              <Tag color="red">{dataSource?.key || "Lỗi Vui Lòng Get Lại Link"}</Tag>
              <p><strong>Lưu Ý:</strong> Không Được Get Nhiều Key Dưới 1 Phút</p>
              <p> Cố Ý Sẽ Bị Thoát Ra</p>
              <button onClick={() => { window.location.reload(); }}>ok</button>
            </>
          }

        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
