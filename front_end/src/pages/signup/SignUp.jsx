import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/redux/authenticateSlice";
import { Header } from "../../components/Header";
import { authenticateRepository } from "../../repository/authenticateRepository";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await authenticateRepository.signup(values);
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
          <div className="title">Sign up</div>
          <div className="form-title">Username</div>
          <Form.Item name={"username"}>
            <Input placeholder="Username" className="input" />
          </Form.Item>
          <div className="form-title">Email address</div>
          <Form.Item name={"email"}>
            <Input placeholder="Email address" className="input" />
          </Form.Item>
          <div className="form-title">Password</div>
          <Form.Item name={"password"}>
            <Input.Password placeholder="Password" className="input" />
          </Form.Item>
          <div className="form-title">Phone</div>
          <Form.Item name={"phone"}>
            <Input placeholder="Phone" className="input" />
          </Form.Item>
          <div className="form-title">Address</div>
          <Form.Item name={"address"}>
            <Input placeholder="Address" className="input" />
          </Form.Item>
          <Button className="btn" htmlType="submit">
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
};
