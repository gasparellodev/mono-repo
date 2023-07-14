import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { createContext, ReactNode, useState } from "react";

export type CreateUserContextDataProps = {
  createUserData: CreateUserDTO;
  setCreateUserData: (
    createUserData: (prevData: CreateUserDTO) => CreateUserDTO
  ) => void;
};

type CreateUserContextProviderProps = {
  children: ReactNode;
};

export const CreateUserContext = createContext<CreateUserContextDataProps>(
  {} as CreateUserContextDataProps
);

export function CreateUserContextProvider({
  children,
}: CreateUserContextProviderProps) {
  const [createUserData, setCreateUserData] = useState<CreateUserDTO>(
    {} as CreateUserDTO
  );

  return (
    <CreateUserContext.Provider value={{ createUserData, setCreateUserData }}>
      {children}
    </CreateUserContext.Provider>
  );
}
