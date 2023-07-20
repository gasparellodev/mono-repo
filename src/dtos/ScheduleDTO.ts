import { ArenaDTO } from "./ArenaDTO";

export type ScheduleDTO = ArenaDTO & {
  status: "confirm" | "reserved" | "pending" | "cancelled";
};
