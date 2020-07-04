import UserType from './UserType';

export interface GoogleUser {
  googleId?: string;
}

export interface FacebookUser {
  facebookId?: string;
}

export interface EmailUser {
  password?: string;
}

export default interface User {
  type: UserType,
  email?: string,
  name?: string,
  cellphone?: string,
  birthDate?: Date | null,
  password?: string,
  googleId?: string,
  facebookId?: string,
}
