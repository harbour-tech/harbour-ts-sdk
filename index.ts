import { UserService } from "./gen/user/v1/public_connectweb";

export const getUserDetails = () => {
  return UserService.methods.getUserDetails({});
};
