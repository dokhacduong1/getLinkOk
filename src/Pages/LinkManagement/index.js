
import { Button, Card, Form, Input, Popconfirm, Table, Select } from "antd";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../Config/Firebase";
import {
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

function LinkManagement(){
    const getLinkCollectionRef = collection(db, "linkManagement");
  const [dataSource, setDataSource] = useState([]);
  const [tempDataSource, setTempDataSource] = useState([]);
  const [deleteId, setDeleteId] = useState([])
  const fetchApi = async () => {
    const data = await getDocs(getLinkCollectionRef);
    const dataDocAllKey = data.docs
      .filter(
        (dataFilter) => dataFilter.data().uidUser === auth?.currentUser?.uid
      )
      .map((dataMap) => dataMap.data());
    setDataSource(dataDocAllKey);
    setTempDataSource(dataDocAllKey);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handeleDelete = async () => {
    if(deleteId.length>0){
      deleteId.map(async (dataMap)=>{
        const categoryDoc = doc(db, "linkManagement", dataMap.id);
        await deleteDoc(categoryDoc);
        setDeleteId([]);
        fetchApi();
      })
  };
}
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setDeleteId(selectedRows);
    },

  };
  //Hàm này search dùng biến temDataSource để tìm cái này cho phép ta lấy dữ liệu lưu chữ tạm thời để tìm kiếm xong set vào DataSource Chính
  const handleForm = async (valueForm) => {
    if (valueForm.select !== "all") {
       //Hàm này convert hai cái về chữ thường xong check
      const dataDocAllCategorys = tempDataSource.filter((dataFilter) =>
        dataFilter[valueForm.select].toLowerCase().includes((valueForm.keyword).toLowerCase())
      );
      setDataSource(dataDocAllCategorys);
    } else {
      setDataSource(tempDataSource);
    }
  };
  const optionsSelect = [
    {
      value: "link",
      label: "Tên Link",
    },
  ];
  const columns = [
    {
      title: "Tên Link",
      dataIndex: "link",
      key: "link",
      align: "center",
    },
   
  ];

  return (
    <>
      <Card>
        <Form
          style={{ display: "flex",justifyContent:"center" }}
          className="search__welcome-form"
          layout="inline"
          rules={{
            remember: true,
          }}
          onFinish={handleForm}
        >
          <Form.Item
            className="search__welcome-item"
            name="select"
            rules={[
              {
                required: true,
                message: "Vui Lòng Chọn ",
              },
            ]}
          >
            <Select
              options={optionsSelect}
              style={{ width: 170 }}
              placeholder="Tìm Kiếm"
              className="search__welcome-form-select"
            />
          </Form.Item>
          <Form.Item name="keyword"  className="search__welcome-item">
            <Input
              style={{ width: 230 }}
              className="search__welcome-form-input"
              placeholder="Nhập Từ Khóa..."
            />
          </Form.Item>

          <Form.Item  className="search__welcome-item">
            <Button
              className="search__welcome-form-button"
              type="primary"
              style={{background:"#333"}}
              htmlType="submit"
            >
              <SearchOutlined /> Search
            </Button>
          </Form.Item>
          <Button
            className="search__welcome-form-button"
            type="primary"
            style={{background:"#333"}}
            onClick={() => {
              handleForm({ select: "all" });
            }}
          >
            <ReloadOutlined /> Reset
          </Button>
        </Form>
        {
          deleteId.length > 0 && (<>
           
            <span
              style={{
                color: "red",
               
                borderRadius: "4px",
                padding:"5px"
              }}
            >
              <Popconfirm
                title="Xóa Link"
                description="Bạn Có Muốn Xóa Link Này Không ?"
                okText="Ok"
                cancelText="No"
                onConfirm={() => {
                  handeleDelete();
                }}
              >
                <span style={{fontSize:"20px",cursor:"pointer"}}>Xóa</span>
              </Popconfirm>
              </span>
            
          </>)
        }
        <Table  rowSelection={{
          type: "checkbox",
          ...rowSelection,

        }}  rowKey="id" dataSource={dataSource} columns={columns} />;
      </Card>
    </>
  );
}
export default LinkManagement