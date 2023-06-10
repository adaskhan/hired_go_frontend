import React from 'react';
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { LoginRecruiter } from '../apis/authetification';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertSlice';

function LoginAsRecruiter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginRecruiter(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate('/');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white p-4 w-400">
        <h4>hiredGo - log in as recruiter</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <Input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>
          <Button className="primary-contained-btn w-100 mt-2" type="primary" htmlType="submit">
            Login
          </Button>
          <Link to="/register" className="d-block mt-2">
            Not a member? Click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default LoginAsRecruiter;