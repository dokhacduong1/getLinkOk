import { Card} from "antd";
import "./HelloWord.scss";



function HelloWord() {
 
  return (
    <>
      <Card className="hello">
        <div className="hello__welcome">
          <div className="hello__welcome-header">
            <h2>Chào Mừng Bạn Đến Với Trang Quản Lý Key</h2>
          </div>
        </div>
      </Card>
    </>
  );
}
export default HelloWord;
