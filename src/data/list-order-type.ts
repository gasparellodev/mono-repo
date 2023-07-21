import { MaterialCommunityIcons } from "@expo/vector-icons";

export type ListItem = {
  icon: typeof MaterialCommunityIcons.prototype.render;
  text: string;
  key: string;
};

export const HomeListOrderType: ListItem[] = [
  {
    icon: "check-bold",
    text: "Horários disponíveis",
    key: "AVAILABLE_TIMES",
  },
  {
    icon: "map-marker-distance",
    text: "Distância de você",
    key: "DISTANCE",
  },
  {
    icon: "clock-fast",
    text: "Horário próximo",
    key: "NEARBY_TIME",
  },
  {
    icon: "star-circle-outline",
    text: "Horário mais barato",
    key: "CHEAPEST",
  },
  {
    icon: "star-check-outline",
    text: "Arena melhor avaliada",
    key: "BEST_RATED",
  },
  {
    icon: "currency-eth",
    text: "Ordenação padrão",
    key: "DEFAULT",
  },
];

export const ScheduleListOrderType: ListItem[] = [
  {
    icon: "clock-check-outline",
    text: "Reserva confirmada",
    key: "RESERVATION_CONFIRMED",
  },
  {
    icon: "clock-alert-outline",
    text: "Reserva solicitada",
    key: "RESERVATION_REQUESTED",
  },
  {
    icon: "clock-remove-outline",
    text: "Reserva cancelada",
    key: "RESERVATION_CANCELED",
  },
  {
    icon: "currency-eth",
    text: "Ordenação padrão",
    key: "DEFAULT",
  },
];
