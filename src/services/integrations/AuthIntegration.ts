import { api } from "@services/api";
import { ChangePasswordDTO } from "src/dtos/ChangePasswordDTO";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { LoginUserDTO } from "src/dtos/LoginUserDTO";
import { ChangeAvatarDTO, ProfileDTO } from "src/dtos/ProfileDTO";
import { UserDTO } from "src/dtos/UserDTO";
import { AuthModel, IAuth } from "src/interfaces/auth";
import { IGetIntegration } from "src/interfaces/getIntegration";
import { IPostIntegration } from "src/interfaces/postIntegration";

export class AuthIntegration implements IAuth {
  private readonly ROUTE = "/auth";
  private readonly ROUTE_USER = "/users";
  private readonly ROUTE_STORAGE = "/storage";

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

  changeProfile: IPostIntegration<ProfileDTO> = async (body) => {
    const payload = {
      name: body.name,
      nickname: body.nickname,
      favorite_sport: body.favorite_sport,
      favorite_time: body.favorite_time,
    };

    await api.patch(`${this.ROUTE_USER}`, payload);
  };

  me: IGetIntegration<{}, UserDTO> = async () => {
    const { data } = await api.get(`${this.ROUTE}/me`);
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      favorite_sport: data.favorite_sport,
      favorite_time: data.favorite_time,
      avatar: data.avatar,
      cpf: data.cpf,
      cellphone: data.cellphone,
      nickname: data.nickname,
      role: data.role ?? "PLAYER",
    };
  };

  changeAvatar: IPostIntegration<ChangeAvatarDTO> = async (body) => {
    const payload = new FormData();
    payload.append("file", JSON.parse(JSON.stringify(body.avatar)));

    await api.post(`${this.ROUTE_STORAGE}/store`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
