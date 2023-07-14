import { z } from "zod";
import { FavoriteSport } from "../../enums/favorite-sport.enum";
import { FavoriteTime } from "../../enums/favorite-time.enum";

export const signUpSecondStepSchema = z.object({
  name: z.string({ required_error: "Informe seu nome" }),
  nickname: z.string({ required_error: "Informe seu apelido" }),
  favorite_sport: z.nativeEnum(FavoriteSport, {
    required_error: "Informe seu esporte favorito",
  }),
  favorite_time: z.nativeEnum(FavoriteTime, {
    required_error: "Informe um horário favorito",
  }),
  cellphone: z.string({ required_error: "Informe seu número de telefone" }),
});
