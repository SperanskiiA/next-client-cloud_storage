import axios from '@/core/axios';
import {
  LoginFormDTO,
  LoginResponseDTO,
  RegistrationFormDTO,
  RegistrationResponseDTO,
  User,
} from './dto/auth.dto';
import { destroyCookie } from 'nookies';

export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  const { data } = await axios.post('/auth/login', values);

  return data;
};

export const registration = async (
  values: RegistrationFormDTO
): Promise<RegistrationResponseDTO> => {
  const { data } = await axios.post('auth/registration', values);
  return data;
};

export const checkLoggedIn = async (): Promise<User> => {
  return (await axios.get('/users/me')).data;
};

export const logout = () => {
  destroyCookie(null, '_token', { path: '/' });
};
