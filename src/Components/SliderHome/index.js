import "./SliderHome.scss"
import {  Menu } from 'antd';
import { LinkOutlined,KeyOutlined,ConsoleSqlOutlined,AndroidOutlined,UserOutlined,StockOutlined} from '@ant-design/icons';
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
        getItem('shortenedLink',<span className="layout__slider-item">Liên Kết Rút Gọn</span>, <span className="layout__slider-item"><LinkOutlined /></span>,[
          getItem('/add-link',<Link to="add-link">Thêm Liên Kết</Link>,null),
          getItem('/link-management',<Link to="link-management">Quản Lý Liên Kết</Link>,null),
        
        ]),
        getItem('addGame',<span className="layout__slider-item">Game</span>, <span className="layout__slider-item"><AndroidOutlined /></span>,[
          getItem('/add-game',<Link to="add-game">Thêm Game</Link>,null),
          getItem('/game-management',<Link to="game-management">Quản Lý Game</Link>,null),
        
        ]),
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