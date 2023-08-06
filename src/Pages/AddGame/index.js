import { Button, Card, Form, Input, Select, message } from "antd";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import "./AddGame.scss";
import { encodeNumberToBase } from "../../Helpers/countWeb";
function AddGame() {
  
  const getGameCollectionRef = collection(db, "gameManagement");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  
  const handleFinish = async (infoForm) => {
    const newDocRef = doc(getGameCollectionRef);
    console.log(infoForm)
    const objectNew = {
        nameGame: infoForm.nameGame,
        uidUser: auth?.currentUser?.uid,
        id: newDocRef.id,
      };
    try {
        await setDoc(newDocRef, objectNew);
        form.resetFields();
        messageApi.open({
          type: "success",
          content: `Thêm Thành Công Game`,
        });
      } catch {
        messageApi.open({
          type: "error",
          content: `Vui Lòng Thêm Lại`,
        });
      }
 
  };
  return (
    <>
      {contextHolder}
      <Card>
        <Form onFinish={handleFinish} layout="vertical" form={form}>
          
          <Form.Item
            name="nameGame"
            label="Tên Game"
            rules={[
              {
                required: true,
                message: "Vui Lòng Nhập Tên Game!",
              },
            ]}
          >
            <Input placeholder="Vui Lòng Nhập Tên Game..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#333" }}
            >
              Thêm Game
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
export default AddGame;
