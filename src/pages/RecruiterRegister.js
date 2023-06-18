import React from 'react';
import { Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { RegisterRecruiter } from '../apis/authetification';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    Object.keys(values).forEach(key => {
        if (key === "image" && values[key]) {
          // append the file object itself, not its name
          formData.append(key, values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      });
  
    try {
      dispatch(ShowLoading());
      const response = await RegisterRecruiter(formData);
      dispatch(HideLoading());
  
      if (response) {
        if (response.success) {
          message.success(response.message);
          navigate("/recruiter_login");
        } else {
          message.error(response.message);
        }
      } else {
        message.error('Response is undefined');
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white p-4 w-400">
        <h4>hiredGo - Регистрация</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <div className="d-flex justify-content-between">
            <div style={{ width: '45%' }}>
              <Form.Item name="first_name" label="Имя">
                <input type="text" />
              </Form.Item>
              <Form.Item name="username" label="Имя пользователя">
                <input type="text" />
              </Form.Item>
              <Form.Item name="gender" label="Пол">
                <input type="text" />
              </Form.Item>
              <Form.Item name="password" label="Пароль">
                <input type="password" />
              </Form.Item>
            </div>
            <div style={{ width: '45%' }}>
              <Form.Item name="last_name" label="Фамилия">
                <input type="text" />
              </Form.Item>
              <Form.Item name="email" label="Почта">
                <input type="text" />
              </Form.Item>
              <Form.Item name="phone" label="Номер телефона">
                <input type="text" />
              </Form.Item>
              <Form.Item name="password2" label="Повторите пароль">
                <input type="password" />
              </Form.Item>
            </div>
          </div>
          <div style={{ width: '90%' }}>
              <Form.Item name="company_name" label="Компания">
                <input type="text" />
              </Form.Item>
            </div>
          <button className="primary-contained-btn w-100 mt-2" type="submit">
            Зарегистрироваться
          </button>
          <Link to="/recruiter_login" className="d-block mt-2">
            Уже зарегистрировались? 
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
