import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import { checkAuth } from '@/utils';
import Layout from '@/layouts/Layout';
import { NextPageWithLayout } from '../_app';
import { UploadButton } from '@/components/uploadButton/UploadButton';
import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/fileList';
import styles from '@/styles/Home.module.scss';

import { Menu } from 'antd';
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { FileActions } from '@/components/fileActions';
import Files from '@/modules/Files';

type Props = {
  items: FileItem[];
};

const DashboardPage: NextPageWithLayout<Props> = ({ items }) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard/All">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('all');

    return {
      props: {
        items,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {
        items: [],
      },
    };
  }
};

export default DashboardPage;
