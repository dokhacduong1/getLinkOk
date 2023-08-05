import "./SliderHome.scss"
import {  Menu } from 'antd';
import { ShoppingCartOutlined,KeyOutlined,ConsoleSqlOutlined,ShopOutlined,UserOutlined,StockOutlined} from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
function SliderHome(){
  const location =useLocation()

    function getItem(key,label, icon, children) {
        return {
          key,
          icon,
          label,
          children,
          
        };
      }
    const items = [
        getItem('/',<Link to="home">Trang Chủ</Link> ,<KeyOutlined />),
        getItem('addKey',<span className="layout__slider-item">Key</span>, <span className="layout__slider-item"><ConsoleSqlOutlined /></span>,[
          getItem('/add-key',<Link to="add-key">Thêm Key</Link>,null),
          getItem('/key-management',<Link to="key-management">Quản Lý Key</Link>,null),
        
        ]),
      
      ];
    return(
        <>
             <Menu className="layout__slider-menu"
               
                defaultSelectedKeys={location.pathname}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </>
    )
}
export default SliderHome