import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { checkAuth } from '@/utils';
import Layout from '@/layouts/Layout';
import { NextPageWithLayout } from '../_app';
import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';

import { DashboardLayout } from '@/layouts/DashboardLayout';
import Files from '@/modules/Files';

type Props = {
  items: FileItem[];
};

const DashboardTrash: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard/Trash">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('trash');

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

export default DashboardTrash;
