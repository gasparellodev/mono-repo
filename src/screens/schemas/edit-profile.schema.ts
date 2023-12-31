import { z } from "zod";
import { PASSWORD_REGEX } from "../../common/regex.const";

export const EditProfileSchema = z
  .object({
    name: z
      .string({ required_error: "Informe seu nome" }),
    nickname: z
      .string({ required_error: "Informe seu apelido" })
  })