import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthToken,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorage] = useState(true);

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post("/api/auth/sign-in", {
        emailOrUsername: email,
        password,
      });
      if (data.user && data.access_token) {
        setIsLoadingUserStorage(true);

        await storageAuthToken(data.access_token);
        await storageUserSave(data.user);

        await userAndTokenUpdate(data.user, data.access_token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorage(true);
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        await userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
