import { api } from "@services/api";
import { IGetIntegration } from "src/interfaces/getIntegration";
import { IArena } from "src/interfaces/home";
import { NearbyArenasRequest, ArenaModel, SearchArenasByNameRequest } from "src/interfaces/home/arenas";

export class ArenaIntegration implements IArena {
  private readonly ROUTE = "/arenas";

  getNearbyArenas: IGetIntegration<NearbyArenasRequest, ArenaModel[]> = async (
    params
  ) => {
    const { data } = await api.get(`${this.ROUTE}/nearby`, {
      params,
    });

    return data.map(
      (arena: any): ArenaModel => ({
        id: arena.id,
        name: arena.name,
        description: arena.description ?? "",
        distance: arena.distance,
        numberAviations: arena.numberAviations ?? 0,
        numberStar: arena.numberStar ?? 0,
      })
    );
  };

  getByName: IGetIntegration<SearchArenasByNameRequest, ArenaModel[]> = async (
    params
  ) => {
    const { data } = await api.get(`${this.ROUTE}/search`, {
      params: {
        latitude: params?.latitude,
        longitude: params?.longitude,
        input: params?.name,
      },
    });

    return data.map(
      (arena: any): ArenaModel => ({
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
