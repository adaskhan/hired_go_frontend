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
      } 
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        return {
          success: false,
          message: error.response.data,
        };
    } else if (error.request) {
        console.log(error.request);
        return {
          success: false,
          message: "No response received from server",
        };
    } else {
        console.log('Error', error.message);
        return {
          success: false,
          message: "Request setup triggered an error",
        };
    }
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