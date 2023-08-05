import { Card, Tag, message } from "antd";
import "./GetKeyUser.scss";
import { FloatButton } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useEffect, useState } from "react";
import { getCookie, setCookiePhien, setCookiePhut } from "../../Helpers/cookie";
import { decodeString, encodeNumberToBase, increaseReloadCount } from "../../Helpers/countWeb";

function GetKeyUser() {
  var reloadCount = localStorage.getItem('reloadCount');
  const [messageApi, contextHolder] = message.useMessage();
  const getKeyCollectionRef = collection(db, "getKey");
  const [dataSource, setDataSource] = useState([]);
  const fetchApi = async () => {

    const data = await getDocs(getKeyCollectionRef);
    const dataDocAllKey = data.docs.map((dataMap) => dataMap.data());
   if (dataDocAllKey.length===0){
    setDataSource({key:"Key Ngày Hôm Nay Đã Hết"});
   }else{
    setDataSource(dataDocAllKey[0]);
   }
    
    setCookiePhut("referrer",document.referrer,1)
    if(dataDocAllKey.length>0){
      const keyDoc = doc(db, "getKey", dataDocAllKey[0]?.id);
      await deleteDoc(keyDoc);
    }
  
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
      messageApi.open({
        type: "error",
        content: `Bạn Đã Cố Truy Cập Hoặc Đã Lấy Key Rồi Vui Lòng Ấn Lại Link Rút Gọn Và Thử Lại`,
    });
    }

  }, []);



  return (
    <>
     {contextHolder}
      <div className="getKeyUser">
        <Card className="getKeyUser__card">
          {
            dataSource && <>
              <h1>Key Của Bạn Là</h1>
              <Tag color="red">{dataSource?.key || "Lỗi Vui Lòng Get Lại Link"}</Tag>
              <p><strong>Lưu Ý:</strong> Không Được Get Nhiều Key Dưới 1 Phút</p>
              <p> Qua 1 Phút Muốn Lấy Lại Key Vui Lòng Get Link Rút Gọn Lại</p>
            
            </>
          }

        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
