const Services = {
  Me: "auth/user/me",
  Login: "auth/user/login",
  Logout: "auth/user/logout",
  verfiyUserEmail: "auth/user/verify",

  registerUser: "/user/register",
  updateUser: "/user/update",
  forgotPassword: "/user/forgotPassword",
  resetPassword: "/user/resetPassword",
 } as const;

export default Services;
