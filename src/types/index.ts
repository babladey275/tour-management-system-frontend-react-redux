export type { IRegister, ILogin, IVerifyOtp, ISendOtp } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
