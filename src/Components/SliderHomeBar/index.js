import { MenuOutlined, ConsoleSqlOutlined,HomeOutlined,LinkOutlined,AndroidOutlined,UserOutlined,StockOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../Helpers/cookie";
import LogoutAndAdmin from "../LogoutAndAdmin";
function SliderHomeBar() {
    const token = getCookie("token");
   
    const itemCookie = [
        
        {
            key: "1",
            type:"group",
            label:  <><LinkOutlined /> Liên Kết Rút Gọn</>,
            children: [
                {
                  key: '1-1',
                  label: <Link to="add-link">Thêm Liên Kết</Link>,
                },
                {
                  key: '1-2',
                  label: <Link to="link-management">Quản Lý Liên Kết</Link>,
                },
              ],
        },
        {
            key: "2",
            type:"group",
            label:  <><AndroidOutlined /> Game</>,
            children: [
                {
                  key: '2-1',
                  label: <Link to="add-game">Thêm Game</Link>,
                },
                {
                  key: '2-2',
                  label: <Link to="game-management">Quản Lý Game</Link>,
                },
              ],
        },
        {
            key: "3",
            type:"group",
            label:  <><ConsoleSqlOutlined /> Key</>,
            children: [
                {
                  key: '3-1',
                  label: <Link to="add-key">Thêm Key</Link>,
                },
                {
                  key: '3-2',
                  label: <Link to="key-management">Quản Lý Key</Link>,
                },
              ],
        },
      
        {
            key: "100",
            label: <LogoutAndAdmin />,
        },
    ];

    const items = itemCookie;
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottom"
               
                trigger={["hover"]}
            >
                <Button>
                    <MenuOutlined />
                </Button>
            </Dropdown>
           
        </>
    );
}
export default SliderHomeBar;
