import { api } from "@services/api";
import { IGetIntegration } from "src/interfaces/getIntegration";
import { IArena } from "src/interfaces/home";
import {
  NearbyArenasRequest,
  ArenaModel,
  SearchArenasByNameRequest,
  AvailableTimesArenaRequest,
  ArenaModelAvailableTime,
} from "src/interfaces/home/arenas";
import { CourtAvailableTime, CourtModel } from "src/interfaces/home/courts";

export class ArenaIntegration implements IArena {
  private readonly ROUTE = "/arenas";
  private readonly ROUTE_RESERVATION = "/reservations";

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

  getAvailableTimes: IGetIntegration<
    AvailableTimesArenaRequest,
    ArenaModelAvailableTime[]
  > = async (body) => {
    const { data } = await api.get(
      `${this.ROUTE_RESERVATION}/find-all-in-day`,
      {
        params: {
          latitude: body?.latitude,
          longitude: body?.longitude,
          only_available: true,
          date: new Date().toISOString().split("T")[0],
        },
      }
    );

    const arenas = data.map(
      (arena: any): ArenaModelAvailableTime => ({
        id: arena.arena_id,
        name: arena.arena,
        courts: arena.courts.map(
          (court: any) =>
            ({
              id: court.court_id,
              name: court.court,
              sport: court.sport_type,
              availableTimes: court.available_times.map(
                (time: any) =>
                  ({
                    hour: time.hour,
                    isAvailable: time.available,
                  } as CourtAvailableTime)
              ),
            } as CourtModel)
        ),
      })
    );

    return arenas;
  };
}
