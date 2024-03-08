// @ts-ignore
/* eslint-disable */

declare namespace AUTH {
  type LoginRequest = {
    username: string;
    password: string;
  };

  type RegisterRequest = {
    username: string;
    password: string;
    checkPassword: string;
  };

  type UserResponse = {
    id?: number;
    username?: string;
    nickname?: string;
    avatar?: string;
    phone?: string;
    email?: string;
    role?: number;
    gender?: number;
    status?: number;
    createTime?: Date;
  };
}
