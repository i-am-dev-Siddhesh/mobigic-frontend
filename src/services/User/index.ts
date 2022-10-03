import { post, put } from "@/services/serverConfig";
import Services from "../serviceUrls";
import {
  TForgotPasswordProps,
  TRegisterUserProps,
  TResetPasswordProps,
  TUpdateUserProps,
} from "./types";

function registerUser(data: TRegisterUserProps): Promise<string> {
  return post(Services.registerUser, {}, data);
}

function updateUser(data: TUpdateUserProps): Promise<string> {
  return post(Services.updateUser, {}, data);
}

function forgotPassword(data: TForgotPasswordProps): Promise<string> {
  return post(Services.forgotPassword, {}, data);
}

function verfiyUserEmail(data: any): Promise<string> {
  return post(Services.verfiyUserEmail, {}, data);
}

function resetPassword(
  data: TResetPasswordProps,
  params: any
): Promise<string> {
  return put(Services.resetPassword, params || {}, data);
}

const UserService = {
  registerUser,
  updateUser,
  forgotPassword,
  resetPassword,
  verfiyUserEmail
};

export default UserService;
