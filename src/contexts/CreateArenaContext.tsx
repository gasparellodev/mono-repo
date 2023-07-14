import { CreateArenaDTO } from "../dtos/CreateArenaDTO";
import { createContext, ReactNode, useState } from "react";

export type CreateArenaContextDataProps = {
  createArenaData: CreateArenaDTO;
  setCreateArenaData: (
    createArenaData: (prevData: CreateArenaDTO) => CreateArenaDTO
  ) => void;
};

type CreateArenaContextProviderProps = {
  children: ReactNode;
};

export const CreateArenaContext = createContext<CreateArenaContextDataProps>(
  {} as CreateArenaContextDataProps
);

export function CreateArenaContextProvider({
  children,
}: CreateArenaContextProviderProps) {
  const [createArenaData, setCreateArenaData] = useState<CreateArenaDTO>(
    {} as CreateArenaDTO
  );

  return (
    <CreateArenaContext.Provider
      value={{ createArenaData, setCreateArenaData }}
    >
      {children}
    </CreateArenaContext.Provider>
  );
}
