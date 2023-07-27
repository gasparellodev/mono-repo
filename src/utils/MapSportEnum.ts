import { AvailableSport } from "../enums/available-sport.enum";

export function sportMapper(sport: AvailableSport) {
  switch (sport) {
    case AvailableSport.BeachTennis:
      return "Beach Tennis";
    case AvailableSport.BasketballHall:
      return "Basquete em Quadra";
    case AvailableSport.FootVolley:
      return "Futevôlei";
    case AvailableSport.FutsalHall:
      return "Futsal em Quadra";
    case AvailableSport.HandballHall:
      return "Handebol em Quadra";
    case AvailableSport.Volleyball:
      return "Vôlei";
    case AvailableSport.SocietySynthetic:
      return "Futebol Society em Gramado Sintético";
    case AvailableSport.Tennis:
      return "Tênis";
    default:
      return "Esporte Indisponível";
  }
}
