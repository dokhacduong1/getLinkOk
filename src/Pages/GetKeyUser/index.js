import { Card, Tag } from "antd";
import "./GetKeyUser.scss";
import { FloatButton } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useEffect, useState } from "react";
import { getCookie, setCookiePhien, setCookiePhut } from "../../Helpers/cookie";
import "./GetKeyUser.scss";
function GetKeyUser() {
  useEffect(() => {
  
    if (getCookie("referrer") === "") {
      window.close()
    }else{
      // window.close()
    }
  }, []);
  

  return (
    <>
      <div className="getKeyUser">
        <Card className="getKeyUser__card">
         <>
               <h1>Key Của Bạn Là</h1>
              <Tag color="red">{"Lỗi Vui Lòng Get Lại Link"}</Tag>
              <p><strong>Lưu Ý:</strong> Không Được Get Nhiều Key Dưới 1 Phút</p>
              <p> Cố Ý Sẽ Bị Thoát Ra</p>
             
            </>
         
         
        </Card>
      </div>
    </>
  );
}
export default GetKeyUser;
