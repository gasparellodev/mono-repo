import { api } from "@services/api";
import { LoginUserDTO } from "src/dtos/LoginUserDTO";
import { ICreateIntegration } from "src/interfaces/createIntegration";

export class SignInIntegration
  implements ICreateIntegration<LoginUserDTO, any>
{
  private readonly ROUTE = "/auth";

  async execute(body: LoginUserDTO) {
    const { data } = await api.post(`${this.ROUTE}/sign-in`, {
      emailOrUsername: body.email,
      password: body.password,
    });

    return data;
  }
}
