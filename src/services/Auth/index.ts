import { post, postWithServerResponse } from "@/services/serverConfig";
import Services from "../serviceUrls";
import { LoginProps } from "./types";

function getLoggedInUser(): Promise<string> {
  return post(Services.Me);
}

function loginUser(data: LoginProps): Promise<any> {
  return postWithServerResponse(Services.Login, {}, data);
}

function logoutUser(): Promise<string> {
  return post(Services.Logout);
}

const AuthService = {
  getLoggedInUser,
  loginUser,
  logoutUser,
};

export default AuthService;
