import React from 'react';
import styles from './Auth.module.scss';
import { Button, Form, Input, notification } from 'antd';
import { RegistrationFormDTO } from '@/api/dto/auth.dto';
import * as Api from '@/api';
import { setCookie } from 'nookies';

export const RegistrationForm: React.FC = () => {
  const onSubmit = async (values: RegistrationFormDTO) => {
    try {
      const { token } = await Api.auth.registration(values);

      notification.success({
        message: 'Congratulations!!!',
        description: 'Now you have an account!',
        duration: 2,
      });

      setCookie(null, '_token', token, {
        path: '/',
      });

      location.href = '/dashboard';
    } catch (error) {
      console.warn(error);

      notification.error({
        message: 'Ooops!',
        description: 'Somthing went wrong...',
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
              message: 'Enter your E-Mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full name:"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Please, enter your full name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password:"
          name="password"
          rules={[
            {
              required: true,
              message: 'Enter your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* 
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="text" htmlType="button">
            Go back!
          </Button>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create an account!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
