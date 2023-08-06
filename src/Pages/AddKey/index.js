import { Button, Card, Form, Input, Select, message } from "antd";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import "./AddKey.scss";
import { encodeNumberToBase } from "../../Helpers/countWeb";
import { useEffect, useState } from "react";
function AddKey() {
  const { TextArea } = Input;
  const getKeyCollectionRef = collection(db, "getKey");
  const getGameCollectionRef = collection(db, "gameManagement");
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const fetchApi = async () => {
    const data = await getDocs(getGameCollectionRef);
    const dataDocAllGame = data.docs
      .filter(
        (dataFilter) => dataFilter.data().uidUser === auth?.currentUser?.uid
      )
      .map((dataMap) => ({value:dataMap.data()?.id,label:dataMap.data()?.nameGame}));
    setDataSource(dataDocAllGame);
    
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleFinish = async (infoForm) => {
    const listKey = infoForm.key.split("\n");
   
    listKey.map(async (dataMap) => {
       
      const newDocRef = doc(getKeyCollectionRef);
      const objectNew = {
        key: dataMap,
        uidUser: auth?.currentUser?.uid,
        id: newDocRef.id,
        idGame:infoForm?.idGame
      };
      
      try {
        await setDoc(newDocRef, objectNew);
        form.resetFields();
        messageApi.open({
          type: "success",
          content: `Thêm Thành Công List Key`,
        });
      } catch {
        messageApi.open({
          type: "error",
          content: `Vui Lòng Thêm Lại`,
        });
      }
    });
  };
  return (
    <>
      {contextHolder}
      <Card>
        <Form onFinish={handleFinish} layout="vertical" form={form}>
          <Form.Item
            className="search__welcome-item"
            name="idGame"
            rules={[
              {
                required: true,
                message: "Vui Lòng Chọn ",
              },
            ]}
          >
            <Select
              options={dataSource}
              style={{ width: 170 }}
              placeholder="Tìm Kiếm"
              className="search__welcome-form-select"
            />
          </Form.Item>
          <Form.Item
            name="key"
            label="Danh Sách Key"
            rules={[
              {
                required: true,
                message: "Vui Lòng Nhập Danh Sách Key!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#333" }}
            >
              Thêm Key
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
export default AddKey;
