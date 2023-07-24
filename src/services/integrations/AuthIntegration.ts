import { api } from "@services/api";
import { ChangePasswordDTO } from "src/dtos/ChangePasswordDTO";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { LoginUserDTO } from "src/dtos/LoginUserDTO";
import { AuthModel, IAuth } from "src/interfaces/auth";
import { IPostIntegration } from "src/interfaces/postIntegration";

export class AuthIntegration implements IAuth {
  private readonly ROUTE = "/auth";

  signIn: IPostIntegration<LoginUserDTO, AuthModel> = async (body) => {
    const { data } = await api.post(`${this.ROUTE}/sign-in`, {
      emailOrUsername: body.email,
      password: body.password,
    });

    return data;
  };

  signUp: IPostIntegration<CreateUserDTO> = async (body) => {
    await api.post(`${this.ROUTE}/sign-up`, body);
  };

  refreshToken: IPostIntegration<{}, AuthModel> = async () => {
    const { data } = await api.post(`${this.ROUTE}/refresh-access`);
    return data;
  };

  changePassword: IPostIntegration<ChangePasswordDTO> = async (body) => {
    const payload = {
      last_password: body.oldPassword,
      password: body.password,
      password_confirmation: body.confirmPassword,
    };

    await api.patch(`${this.ROUTE}/update-password`, payload);
  };
}
