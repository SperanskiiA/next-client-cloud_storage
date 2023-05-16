import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { LoginForm } from '@/components/auth/LoginForm';
import { Tabs } from 'antd';
import { RegistrationForm } from '@/components/auth/RegistrationForm';

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard/Auth</title>
      </Head>
      <main style={{ width: '400px', margin: '50px auto' }}>
        <Tabs
          items={[
            {
              label: 'Sign in',
              key: 'login',
              children: <LoginForm />,
            },
            {
              label: 'Sign up',
              key: 'registration',
              children: <RegistrationForm />,
            },
          ]}
        />
      </main>
    </>
  );
};

export default AuthPage;
