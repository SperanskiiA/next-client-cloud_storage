import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { checkAuth } from '@/utils';
import Layout from '@/layouts/Layout';
import { NextPageWithLayout } from '../_app';
import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { FileList } from '@/components/fileList';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import Files from '@/modules/Files';

type Props = {
  items: FileItem[];
};

const DashboardPhotos: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard/Images">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('photo');

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

export default DashboardPhotos;
