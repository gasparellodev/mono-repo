import { IGetIntegration } from "../getIntegration";
import {
  NearbyArenasRequest,
  ArenaModel,
  SearchArenasByNameRequest,
} from "./arenas";

export interface IArena {
  getNearbyArenas: IGetIntegration<NearbyArenasRequest, ArenaModel[]>;
  getByName: IGetIntegration<SearchArenasByNameRequest, ArenaModel[]>;
}
