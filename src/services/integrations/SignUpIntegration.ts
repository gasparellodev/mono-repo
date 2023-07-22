import { api } from "@services/api";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { ICreateIntegration } from "src/interfaces/createIntegration";

export class SignUpIntegration implements ICreateIntegration<CreateUserDTO> {
  private readonly ROUTE = "/auth";

  async create(body: CreateUserDTO) {
    await api.post(`${this.ROUTE}/sign-up`, body);
  }
}
