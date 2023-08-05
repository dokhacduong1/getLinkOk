import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../Helpers/cookie";



function PrivateRoutes() {
  const token =  getCookie("token");

  return (
    <>
      {token ? (<Outlet />) : (<Navigate to="/" />)}
    </>
  )
}

export default PrivateRoutes;