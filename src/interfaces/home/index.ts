import { IGetIntegration } from "../getIntegration";
import {
  NearbyArenasRequest,
  ArenaModel,
  SearchArenasByNameRequest,
  AvailableTimesArenaRequest,
  ArenaModelAvailableTime,
} from "./arenas";

export interface IArena {
  getNearbyArenas: IGetIntegration<NearbyArenasRequest, ArenaModel[]>;
  getByName: IGetIntegration<SearchArenasByNameRequest, ArenaModel[]>;
  getAvailableTimes: IGetIntegration<
    AvailableTimesArenaRequest,
    ArenaModelAvailableTime[]
  >;
}
