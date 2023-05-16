import { Layout, Avatar, Menu, Popover, Button } from 'antd';
import styles from './header.module.scss';
import { CloudOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import * as Api from '@/api';

export const Header: React.FC = () => {
  const router = useRouter();

  const selectedMenu = router.pathname;

  const logoutHandle = () => {
    if (window.confirm('Are you definitely want to log out?')) {
      Api.auth.logout();
      location.href = '/';
    }
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>
          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            onSelect={({ key }) => router.push(key)}
            items={[
              { key: '/dashboard', label: 'Home' },
              { key: '/dashboard/profile', label: 'Account' },
            ]}
          />
        </div>
        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Button type="primary" danger onClick={logoutHandle}>
                Logout
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};
