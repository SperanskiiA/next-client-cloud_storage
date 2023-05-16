import { User } from '@/api/dto/auth.dto';
import { NextPageWithLayout } from '../_app';
import { GetServerSidePropsContext, NextPage } from 'next';
import styles from '@/styles/Profile.module.scss';
import * as Api from '@/api';
import { Button } from 'antd';
import { checkAuth } from '@/utils/checkAuth';
import Layout from '@/layouts/Layout';

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const logoutHandle = () => {
    if (window.confirm('Are you definitely want to log out?')) {
      Api.auth.logout();
      location.href = '/';
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>My profile</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Full name: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={logoutHandle} type="primary" danger>
          Log out
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) return authProps;

  const userData = await Api.auth.checkLoggedIn();

  return {
    props: { userData },
  };
};

export default DashboardProfilePage;
