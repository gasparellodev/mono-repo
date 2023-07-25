import { api } from "@services/api";
import { ScheduleDTO } from "src/dtos/ScheduleDTO";
import { IGetIntegration } from "src/interfaces/getIntegration";
import { IArena } from "src/interfaces/home";
import {
  NearbyArenasRequest,
  ArenaModel,
  SearchArenasByNameRequest,
  AvailableTimesArenaRequest,
  ArenaModelAvailableTime,
  ScheduleArenaRequest,
  ScheduleArenaModel,
} from "src/interfaces/home/arenas";
import { CourtAvailableTime, CourtModel } from "src/interfaces/home/courts";
import { IPostIntegration } from "src/interfaces/postIntegration";

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

  scheduleArena: IPostIntegration<ScheduleArenaRequest> = async (body) => {
    const payload = {
      date: body.date,
      court_id: body.courtId,
    };

    await api.post(this.ROUTE_RESERVATION, payload);
  };

  getSchedules: IGetIntegration<{}, ScheduleArenaModel[]> = async () => {
    const { data } = await api.get(`${this.ROUTE_RESERVATION}/find-by-user`);

    return data.map(
      (schedule: any): ScheduleArenaModel => ({
        id: schedule.id,
        date: schedule.date,
        court: schedule.court,
        arena: schedule.arena,
        court_id: schedule.court_id,
        arena_id: schedule.arena_id,
        status: schedule.status,
      })
    );
  };
}
