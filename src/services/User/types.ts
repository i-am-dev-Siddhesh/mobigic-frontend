export type TRegisterUserProps = {
  name: String; 
  email: String; 
  password: String;
};

export type TUpdateUserProps = {
  name?: String;
  phoneNumber?: String;
  email?: String;
  address?: String;
  image?: File;
};

export type TForgotPasswordProps = {
  email: String;
};

export type TResetPasswordProps = {
 
  password: String;
  passwordConfirmation: String;
};
