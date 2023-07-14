import { z } from "zod";
import { ValidateCNPJ } from "@utils/ValidateCNPJ";

export const myArenaRegisterSchema = z.object({
  name: z.string({ required_error: "Informe o nome da arena" }),
  cnpj: z.string({ required_error: "Informe o CNPJ da arena" }).refine(
    (value) => {
      return new ValidateCNPJ().handle(value);
    },
    { message: "CNPJ Inválido" }
  ),
  phone: z
    .string({ required_error: "Informe o telefone da arena" })
    .min(11, { message: "Número incorreto" }),
});
