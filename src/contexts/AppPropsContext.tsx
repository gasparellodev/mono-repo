import { ReactNode, createContext, useEffect, useState } from "react";
import { ScheduleDTO } from "src/dtos/ScheduleDTO";

export type AppPropsDataProps = {
  schedule: {
    list: ScheduleDTO[];
    add: (schedule: ScheduleDTO) => Promise<void>;
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
  const [schedulesList, setSchedulesList] = useState<ScheduleDTO[]>([]);
  const [isLoadingSchedulesList, setIsLoadingSchedulesList] = useState(true);

  async function handleAddSchedule(schedule: ScheduleDTO) {
    try {
      setIsLoadingSchedulesList(true);
      setSchedulesList((oldSchedulesList) => [...oldSchedulesList, schedule]);
      // TODO: post schedule on backend
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingSchedulesList(false);
    }
  }

  async function loadSchedulesList() {
    try {
      setIsLoadingSchedulesList(true);
      // TODO: get schedulesList from backend
      setSchedulesList([
        {
          status: "reserved",
          date: "2021-06-04T18:00:00.000Z",
          place: "Quadra 1",
          price: 78,
          sport: "Society 4",
          time: "08:00",
        },
        {
          status: "pending",
          date: "2021-06-04T18:00:00.000Z",
          place: "Quadra 2",
          price: 79,
          sport: "Basquete 5",
          time: "09:00",
        },
        {
          status: "cancelled",
          date: "2021-06-04T18:00:00.000Z",
          place: "Quadra 3",
          price: 133,
          sport: "Society 6",
          time: "10:00",
        },
      ]);
    } catch (error) {
      throw error;
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
