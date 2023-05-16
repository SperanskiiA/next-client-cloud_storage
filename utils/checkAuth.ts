import axios from '@/core/axios';
import nookies from 'nookies';
import * as Api from '@/api';
import { GetServerSidePropsContext } from 'next';

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { _token } = nookies.get(ctx);

  axios.defaults.headers.Authorization = 'Bearer ' + _token;

  try {
    await Api.auth.checkLoggedIn();

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/dashboard/auth',
        permanenr: false,
      },
    };
  }
};
