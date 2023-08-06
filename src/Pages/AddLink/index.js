import { Button, Card, Form, Input, Select, message } from "antd";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";

import { encodeNumberToBase } from "../../Helpers/countWeb";
function AddLink(){
    const getLinkCollectionRef = collection(db, "linkManagement");
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    
    const handleFinish = async (infoForm) => {
      const newDocRef = doc(getLinkCollectionRef);
     
      const objectNew = {
          link: infoForm.link,
          uidUser: auth?.currentUser?.uid,
          id: newDocRef.id,
        };
      try {
          await setDoc(newDocRef, objectNew);
          form.resetFields();
          messageApi.open({
            type: "success",
            content: `Thêm Thành Công Link`,
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
              name="link"
              label="Tên Link"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Nhập Link!",
                },
              ]}
            >
              <Input placeholder="Vui Lòng Nhập Link..." />
            </Form.Item>
  
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#333" }}
              >
                Thêm Link
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
}
export default AddLink