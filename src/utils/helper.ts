export const errorFormatter = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.data?.message ||
    error?.message ||
    "Something went wrong";

  return message;
};
export function makeId(length: any) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
