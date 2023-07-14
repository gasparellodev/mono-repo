import { z } from "zod";

export const myArenaRegisterAddressSchema = z.object({
  description: z.string({ required_error: "Informe o endereço da arena" }),
  lat: z.number({ required_error: "Endereço inválido" }),
  lon: z.number({ required_error: "Endereço inválido" }),
});
