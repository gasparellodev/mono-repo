import { z } from "zod";
import { PASSWORD_REGEX } from "../../common/regex.const";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Informe sua senha atual" })
      .regex(
        new RegExp(PASSWORD_REGEX),
        "A senha deve conter pelo menos um dígito ou um caractere especial, uma letra maiúscula e uma letra minúscula."
      )
      .min(8, "A senha deve conter 8 ou mais dígitos"),
    password: z
      .string({ required_error: "Informe sua nova senha" })
      .regex(
        new RegExp(PASSWORD_REGEX),
        "A senha deve conter pelo menos um dígito ou um caractere especial, uma letra maiúscula e uma letra minúscula."
      ),
    confirmPassword: z.string({ required_error: "Confirme sua nova senha" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
