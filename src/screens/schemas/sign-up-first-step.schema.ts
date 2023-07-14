import { z } from "zod";
import { PASSWORD_REGEX } from "../../common/regex.const";

export const signUpFirstStepSchema = z
  .object({
    email: z
      .string({ required_error: "Informe seu e-mail" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string({ required_error: "Informe sua senha" })
      .regex(
        new RegExp(PASSWORD_REGEX),
        "A senha deve conter pelo menos um dígito ou um caractere especial, uma letra maiúscula e uma letra minúscula."
      )
      .min(8, "A senha deve conter 8 ou mais dígitos"),
    password_confirmation: z.string({ required_error: "Confirme sua senha" }),
  })
  .refine((data) => data.password_confirmation === data.password, {
    message: "As senhas devem ser iguais",
    path: ["password_confirmation"],
  });
