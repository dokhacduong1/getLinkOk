import { Card, Tag } from "antd";
import "./GetKeyUser.scss";
import { FloatButton } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useEffect, useState } from "react";
import { getCookie, setCookiePhut } from "../../Helpers/cookie";

function GetKeyUser() {
 
  const getKeyCollectionRef = collection(db, "getKey");
  const [dataSource, setDataSource] = useState([]);
  const fetchApi = async () => {
    setCookiePhut("referrer",document.referrer,1)
    const data = await getDocs(getKeyCollectionRef);
    const dataDocAllKey = data.docs
      .filter(
        (dataFilter) => dataFilter.data().uidUser === auth?.currentUser?.uid
      )
      .map((dataMap) => dataMap.data());
    setDataSource(dataDocAllKey[0]);
  };


console.log(document.referrer)
  useEffect(() => {
    const checkUser = document.referrer
    if (checkUser.includes("https://dilink.net/quangly/chuyen_URL.php?url_chuyen=https://www.duongshop.xyz/") && getCookie("referrer") === "") {

      fetchApi();
    }else{
      // window.close()
    }
  }, []);

  return (
    <>
      <div className="getKeyUser">
        <Card className="getKeyUser__card">
          {
            dataSource && <>
               <h1>Key Của Bạn Là</h1>
              <Tag color="red">{dataSource?.key}</Tag>
              <p><strong>Lưu Ý:</strong> Không Được Get Nhiều Key Dưới 1 Phút</p>
              <p> Cố Ý Sẽ Bị Thoát Ra</p>
            </>
          }
         
        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
