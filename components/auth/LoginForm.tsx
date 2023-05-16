import React from 'react';
import styles from './Auth.module.scss';
import { Form, Input, Button, notification } from 'antd';
import * as Api from '@/api';

import { LoginFormDTO } from '@/api/dto/auth.dto';
import { setCookie } from 'nookies';

export const LoginForm: React.FC = () => {
  const onSubmit = async (values: LoginFormDTO) => {
    try {
      const { token } = await Api.auth.login(values);

      notification.success({
        message: 'Successfully logged in!',
        description: "Movin' to admin portal...",
        duration: 2,
      });

      setCookie(null, '_token', token, {
        path: '/',
      });

      location.href = '/dashboard';
    } catch (error: any) {
      console.warn('loginform', error);

      notification.error({
        message: 'Ooops...',
        description: 'Somthing went wrong',
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Email:"
          name="email"
          rules={[
            {
              required: true,
              message: 'Enter your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[{ required: true, message: 'Enter your password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
