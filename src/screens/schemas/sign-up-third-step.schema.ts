import { z } from "zod";
import { Role } from "../../enums/role.enum";

export const signUpThirdStepSchema = z.object({
  role: z.nativeEnum(Role, { required_error: "Selecione um tipo de conta" }),
});
