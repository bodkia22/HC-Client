import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { set } from 'js-cookie';
import { postRequest, getRequest } from '../../utils/helpers/request.helpers';

import './login-form.scss';

//redux
import { setUser } from '../../store/actions/user.actions'
import { useDispatch } from 'react-redux';
import { Facebook } from '../facebook/facebook';

const { Item } = Form; 

export const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(false);
  
  const onFinish = async values => {
    setSpinning(true);

    const { status, data } = await postRequest('/auth/login', values);
    
    if(status === 200) {
      if (!data.isEmailConfirmed) {
        form.setFields([{
          name: 'username',
          value: values.username,
          errors: ["Please comfirm your email before start using the application."]
        }]);
        setSpinning(false);
        return;
      };
      if(data.jwtToken != null){
        set('token', data.jwtToken);

        const userRespounce = await getRequest('/users/get-authorized');
        if(userRespounce.status === 200){
          dispatch(setUser(userRespounce.data));
        }
      }
    }
    else {
      form.setFields([
        {
          name: 'username',
          value: values.username,
          errors: ["Login or password is invalid"]
        },
        {
          name: 'password',
          value: values.password,
          errors: ["Login or password is invalid"]
        }
      ]);
    }
    setSpinning(false);
  };

  return (
    <Spin tip="Loading..." spinning={spinning}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username or Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or email" />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Item>
        <Item>
          <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Item>

          <Link to="/password/forgot" className="login-form-forgot">
            Forgot password
          </Link>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in 
          </Button>
          <Facebook/>
          Or <Link to="/register">register now!</Link> 
        </Item>
      </Form>
      </Spin>
  );
};