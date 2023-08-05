import { MenuOutlined, ShoppingCartOutlined,HomeOutlined,ConsoleSqlOutlined,ShopOutlined,UserOutlined,StockOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../Helpers/cookie";
import LogoutAndAdmin from "../LogoutAndAdmin";
function SliderHomeBar() {
    const token = getCookie("token");
    const itemsNoCookie = [
        {
            key: "1",
            label: <NavLink to={"/login"}>Login</NavLink>,
        },
        {
            key: "2",
            label: <NavLink to={"register"}>Register</NavLink>,
        },
    ];;
    const itemCookie = [
        
        {
            key: "1",
            type:"group",
            label:  <><ConsoleSqlOutlined /> Danh Mục</>,
            children: [
                {
                  key: '1-1',
                  label: <Link to="add-category">Thêm Danh Mục</Link>,
                },
                {
                  key: '1-2',
                  label: <Link to="category-management">Quản Lý Danh Mục</Link>,
                },
              ],
        },
        {
            key: "2",
            type:"group",
            label:  <><ShopOutlined /> Shop Nguồn</>,
            children: [
                {
                  key: '2-1',
                  label: <Link to="add-source-shop">Thêm Shop Nguồn</Link>,
                },
                {
                  key: '2-2',
                  label: <Link to="source-shop-management">Quản Lý Shop Nguồn</Link>,
                },
              ],
        },
        {
            key: "3",
            type:"group",
            label:  <><ShoppingCartOutlined /> Sản Phẩm</>,
            children: [
                {
                  key: '3-1',
                  label: <Link to="add-products">Thêm Sản Phẩm</Link>,
                },
                {
                  key: '3-2',
                  label: <Link to="product-management">Quản Lý Sản Phẩm</Link>,
                },
              ],
        },
        {
            key: "4",
            type:"group",
            label:  <><UserOutlined /> Khách Hàng</>,
            children: [
                {
                  key: '4-1',
                  label: <Link to="add-customers">Thêm Khách Hàng</Link>,
                },
                {
                  key: '4-2',
                  label: <Link to="add-oders">Thêm Đơn Hàng</Link>,
                },
                {
                    key: '4-3',
                    label:<Link to="add-customers-management">Quản Lý Khách Hàng</Link>,
                  },
              ],
        },
        {
            key: "5",
            type:"group",
            label:  <><StockOutlined /> Thống Kê</>,
            children: [
                {
                  key: '5-1',
                  label: <Link to="statistical-management">Thống Kê Đơn Hàng</Link>,
                },
                {
                  key: '5-2',
                  label: <Link to="statistical-shoppe">Thống Kê Shoppe</Link>,
                }
               
              ],
        },
        {
            key: "100",
            label: <LogoutAndAdmin />,
        },
    ];

    const items = token ? itemCookie : itemsNoCookie;
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
