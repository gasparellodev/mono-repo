import { api } from "@services/api";
import { IGetIntegration } from "src/interfaces/getIntegration";
import { IArena } from "src/interfaces/home";
import {
  NearbyArenasRequest,
  NearbyArenasResponse,
} from "src/interfaces/home/nearbyArenas";

export class ArenaIntegration implements IArena {
  private readonly ROUTE = "/arenas";

  getNearbyArenas: IGetIntegration<
    NearbyArenasRequest,
    NearbyArenasResponse[]
  > = async (params) => {
    const { data } = await api.get(`${this.ROUTE}/nearby`, {
      params,
    });

    return data.map(
      (arena: any): NearbyArenasResponse => ({
        id: arena.id,
        name: arena.name,
        description: arena.description ?? "",
        distance: arena.distance,
        numberAviations: arena.numberAviations ?? 0,
        numberStar: arena.numberStar ?? 0,
      })
    );
  };
}
