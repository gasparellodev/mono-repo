import { CourtModel } from "./courts";

export type NearbyArenasRequest = {
  latitude: number;
  longitude: number;
};

export type SearchArenasByNameRequest = {
  name: string;
  latitude: number;
  longitude: number;
};

export type AvailableTimesArenaRequest = {
  latitude: number;
  longitude: number;
};

export type ScheduleArenaRequest = {
  date: Date;
  courtId: string;
};

export type ArenaModel = {
  id: string;
  name: string;
  description: string;
  numberStar: number;
  numberAviations: number;
  distance: number;
};

export type ScheduleArenaModel = {
  id: string;
  date: string;
  court: string;
  court_id: string;
  arena: string;
  arena_id: string;
  status: "confirm" | "reserved" | "pending" | "cancelled";
};

export type ArenaModelAvailableTime = {
  id: string;
  name: string;
  courts: CourtModel[];
};
