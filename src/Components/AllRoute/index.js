import { useRoutes } from "react-router-dom";
import { routes } from "../../Routes";

function AllRoute(){
    const element = useRoutes(routes);
    return element;
}
export default AllRoute;