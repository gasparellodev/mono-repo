import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { IPostIntegration } from "../postIntegration";
import { LoginUserDTO } from "src/dtos/LoginUserDTO";
import { UserDTO } from "src/dtos/UserDTO";
import { ChangePasswordDTO } from "src/dtos/ChangePasswordDTO";

export type AuthModel = {
  access_token: string;
  user: UserDTO;
};

export interface IAuth {
  signIn: IPostIntegration<LoginUserDTO, AuthModel>;
  signUp: IPostIntegration<CreateUserDTO>;
  refreshToken: IPostIntegration<{}, AuthModel>;
  changePassword: IPostIntegration<ChangePasswordDTO>;
}
