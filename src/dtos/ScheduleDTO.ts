import { ArenaDTO } from "./ArenaDTO";

export type ScheduleDTO = ArenaDTO & {
  status: "confirm" | "reserved" | "pending" | "cancelled";
};

export type ScheduleArenaCourtDTO = {
  id: string;
  date: Date;
  name: string;
  sport: string;
  time: string;
  status: "confirm" | "reserved" | "pending" | "cancelled";
};
