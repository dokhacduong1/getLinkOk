import { Button, Card, Tag } from "antd";

import { FloatButton } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useEffect, useState } from "react";
import { getCookie, setCookiePhien, setCookiePhut } from "../../Helpers/cookie";
import { useNavigate } from "react-router-dom";

function Home(){
    const getKeyCollectionRef = collection(db, "getKey");
    const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([]);
  const fetchApi = async () => {
    
    const data = await getDocs(getKeyCollectionRef);
    const dataDocAllKey = data.docs.map((dataMap) => dataMap.data());
    setDataSource(dataDocAllKey[0]);
    // setCookiePhut("referrer",document.referrer,1)
    // setCookiePhien("referrer",document.referrer)
    // const keyDoc = doc(db, "getKey", dataDocAllKey[0].id);
    // await deleteDoc(keyDoc);
  };

  const handleClick = async()=>{
    navigate(`/key/${dataSource.id}`)
  }

  useEffect(() => {
    const checkUser = document.referrer
    const link =["https://dilink.net/","https://beelink.life/"]
   
    const checkOk = link.some(dataSome =>dataSome === checkUser)
    console.log(checkOk && getCookie("referrer") === "")
    if (getCookie("referrer") === "") {

      fetchApi();
    }else{
      window.close()
    }
   
  }, []);
    return(
        <>
            <Card style={{textAlign:"center"}}>
                <Button href="/key/sadsda"danger>Get Key</Button>
            </Card>
           
        </>
    )
}
export default Home