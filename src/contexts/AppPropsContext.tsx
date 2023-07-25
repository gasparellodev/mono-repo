import { toast } from "@backpackapp-io/react-native-toast";
import { ArenaIntegration } from "@services/integrations/ArenaIntegration";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { ReactNode, createContext, useEffect, useState } from "react";
import { ScheduleArenaCourtDTO } from "src/dtos/ScheduleDTO";
import { ScheduleArenaModel } from "src/interfaces/home/arenas";

export type AppPropsDataProps = {
  schedule: {
    list: ScheduleArenaModel[];
    add: (schedule: ScheduleArenaCourtDTO) => Promise<void>;
    isLoading: boolean;
  };
};

type AppPropsProviderProps = {
  children: ReactNode;
};

export const AppPropsContext = createContext<AppPropsDataProps>(
  {} as AppPropsDataProps
);
export function AppPropsProvider({ children }: AppPropsProviderProps) {
  const arenaIntegration = new ArenaIntegration();
  const [schedulesList, setSchedulesList] = useState<ScheduleArenaModel[]>([]);
  const [isLoadingSchedulesList, setIsLoadingSchedulesList] = useState(true);

  async function handleAddSchedule(court: ScheduleArenaCourtDTO) {
    try {
      setIsLoadingSchedulesList(true);
      await arenaIntegration.scheduleArena({
        courtId: court.id,
        date: court.date,
      });

      toast.success("Agendamento criado com sucesso");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possível criar agendamento. Tente novamente mais tarde";

      toast.error(title);
    } finally {
      setIsLoadingSchedulesList(false);
    }
  }

  async function loadSchedulesList() {
    try {
      setIsLoadingSchedulesList(true);
      const schedules = await arenaIntegration.getSchedules();
      setSchedulesList(schedules);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi listar quadras agendadas. Tente novamente mais tarde";

      toast.error(title);
    } finally {
      setIsLoadingSchedulesList(false);
    }
  }

  useEffect(() => {
    loadSchedulesList();
  }, []);

  return (
    <AppPropsContext.Provider
      value={{
        schedule: {
          list: schedulesList,
          add: handleAddSchedule,
          isLoading: isLoadingSchedulesList,
        },
      }}
    >
      {children}
    </AppPropsContext.Provider>
  );
}
