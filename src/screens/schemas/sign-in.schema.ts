import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Informe seu e-mail" })
    .email({ message: "E-mail inválido" }),
  password: z.string({ required_error: "Informe sua senha" }),
});
