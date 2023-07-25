import { AvailableSport } from "src/enums/available-sport.enum";

export type CourtAvailableTime = {
  hour: number;
  isAvailable: boolean;
};

export type CourtModel = {
  id: string;
  name: string;
  sport: AvailableSport;
  availableTimes: CourtAvailableTime[];
};
