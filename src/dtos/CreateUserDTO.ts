import { FavoriteSport } from "../enums/favorite-sport.enum";
import { FavoriteTime } from "../enums/favorite-time.enum";
import { Role } from "../enums/role.enum";

export type CreateUserDTO = {
  name: string;
  favorite_sport: FavoriteSport;
  favorite_time: FavoriteTime;
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
  cellphone: string;
  role: Role;
};
