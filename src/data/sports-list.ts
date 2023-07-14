import { FavoriteSport } from "../enums/favorite-sport.enum";

export const SportsList: Array<{ key: string; value: string }> = [
  {
    key: FavoriteSport.BeachTennis,
    value: "Beach Tênis",
  },
  {
    key: FavoriteSport.BasketballHall,
    value: "Basquete (salão)",
  },
  {
    key: FavoriteSport.FootVolley,
    value: "Futevolei",
  },
  {
    key: FavoriteSport.FutsalHall,
    value: "Futsal (salão)",
  },
  {
    key: FavoriteSport.HandballHall,
    value: "Handball (salão)",
  },
  {
    key: FavoriteSport.Volleyball,
    value: "Voleiball",
  },
  {
    key: FavoriteSport.SocietySynthetic,
    value: "Society (Sintético)",
  },
  {
    key: FavoriteSport.Tennis,
    value: "Tênis",
  },
  {
    key: FavoriteSport.None,
    value: "Não tenho esporte favorito",
  },
];
