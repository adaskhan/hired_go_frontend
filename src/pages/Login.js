import React from 'react';
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../apis/authetification';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
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
        <h4>hiredGo - войти</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Имя пользователя или почта">
            <Input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Пароль">
            <Input.Password />
          </Form.Item>
          <Button className="primary-contained-btn w-100 mt-2" type="primary" htmlType="submit">
            Войти
          </Button>
          <Link to="/register" className="d-block mt-2">
            Еще не зарегистрировались? 
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
