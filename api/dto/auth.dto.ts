export interface LoginFormDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
}

export type RegistrationFormDTO = LoginFormDTO & { fullName: string };

export type RegistrationResponseDTO = LoginResponseDTO;

export interface User {
  id: number;
  email: string;
  fullName: string;
}
