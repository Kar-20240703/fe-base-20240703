import { http } from "@/utils/http";
import { baseApi } from "@/api/utils";

export type UserResult = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 当前登录用户的角色 */
  roles: Array<string>;
  /** `token` */
  jwt: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  jwtRefreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  jwtExpireTs: number;
};

export type RefreshTokenResult = {
  /** `token` */
  jwt: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  jwtRefreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  jwtExpireTs: number;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>(
    "post",
    baseApi("/sign/userName/signIn/password"),
    data
  );
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    "post",
    baseApi("sign/userName/jwtRefreshToken"),
    data
  );
};
