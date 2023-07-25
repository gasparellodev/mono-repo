import { IGetIntegration } from "../getIntegration";
import { IPostIntegration } from "../postIntegration";
import {
  NearbyArenasRequest,
  ArenaModel,
  SearchArenasByNameRequest,
  AvailableTimesArenaRequest,
  ArenaModelAvailableTime,
  ScheduleArenaRequest,
  ScheduleArenaModel,
} from "./arenas";

export interface IArena {
  getNearbyArenas: IGetIntegration<NearbyArenasRequest, ArenaModel[]>;
  getByName: IGetIntegration<SearchArenasByNameRequest, ArenaModel[]>;
  getAvailableTimes: IGetIntegration<
    AvailableTimesArenaRequest,
    ArenaModelAvailableTime[]
  >;
  scheduleArena: IPostIntegration<ScheduleArenaRequest>;
  getSchedules: IGetIntegration<{}, ScheduleArenaModel[]>;
}
