import { Button, Form, Input, message } from "antd";
import "./Login.scss"
import { auth } from "../../Config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "../../Helpers/cookie";
import { useDispatch } from "react-redux";
import { authentication } from "../../Action/auth";
import { useNavigate } from "react-router-dom";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const handleFinish = async (infoInput) => {
        try {
            await signInWithEmailAndPassword(auth, infoInput.email, infoInput.password);
            const time = 1;
            setCookie("id", auth?.currentUser?.uid, time);
            setCookie("email", infoInput.email, time);
            setCookie("token", auth?.currentUser?.accessToken, time);
            dispatch(authentication(true));
            navigate("/home")
        }
        catch (err) {
            messageApi.open({
                type: "error",
                content: `Sai Tài Khoản Hoặc Mật Khẩu Rồi`,
            });
        }
    }
    return (
        <>
        {contextHolder}
        <a href="http://localhost:3000/" target="blank">test</a>
            <div className="login">
                <div className="login__container">
                    <Form className="login__form"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            maxWidth: 300,
                        }}
                        onFinish={handleFinish}

                    >
                        <h1 style={{textAlign:"center"}}>Đăng Nhập</h1>
                        <Form.Item name="email" label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                    type: "email"
                                }
                            ]}
                        >
                            <Input placeholder="Email" className="login__form-input" />
                        </Form.Item>

                        <Form.Item name="password" label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                }
                            ]}
                        >
                            <Input.Password placeholder="Password" className="login__form-input" />

                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login__form-button">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>

        </>
    );
}
export default Login;
