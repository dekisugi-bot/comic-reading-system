import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/redux/authenticateSlice";
import { Header } from "../../components/Header";
import { authenticateRepository } from "../../repository/authenticateRepository";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await authenticateRepository.login(values);
      dispatch(login(values));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <Form className="login-form" onFinish={onFinish}>
          <div className="title">Log in</div>
          <div className="form-title">Username</div>
          <Form.Item name={"username"}>
            <Input placeholder="Username" className="input" />
          </Form.Item>
          <div className="form-title">Password</div>
          <Form.Item name={"password"}>
            <Input.Password placeholder="Password" className="input" />
          </Form.Item>
          <Button className="btn" htmlType="submit">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};
