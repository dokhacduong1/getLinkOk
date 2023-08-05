import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { useDispatch } from "react-redux";
import "./LogoutAndAdmin.scss"
// import { auth } from "../../action/auth"
import { deleteAllCookies } from "../../Helpers/cookie";

import { authentication } from "../../Action/auth";
function LogoutAndAdmin() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
         dispatch(authentication(false));
        deleteAllCookies();
        navigate("/login");
    }
  
    return (
        <>
            <div className="header__account-button" >      
                <Button className="header__account-button-p" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="header__account-bar" >      
                <span onClick={handleLogout}>Logout</span>
            </div>
        </>
    )
}
export default LogoutAndAdmin