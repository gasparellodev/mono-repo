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
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "@services/api";
import { AuthIntegration } from "@services/integrations/AuthIntegration";
import { AppError } from "@utils/AppError";

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
  const authIntegration = new AuthIntegration();

  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorage] = useState(true);

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  async function singIn(email: string, password: string) {
    try {
      const data = await authIntegration.signIn({ email, password });
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

  const refreshToken = useCallback(
    async (error: any) => {
      if (!error?.response?.data) return;

      if (error?.response?.data?.message === "token_expired") {
        try {
          const data = await authIntegration.refreshToken({});

          if (data?.user && data?.access_token) {
            setIsLoadingUserStorage(true);

            await storageAuthToken(data.access_token);
            await storageUserSave(data.user);

            await userAndTokenUpdate(data.user, data.access_token);

            return Promise.resolve(
              await api.request({
                ...error.response.config,
                headers: { Authorization: `Bearer ${data.access_token}` },
              })
            );
          }
        } catch {
          signOut();
          return Promise.reject(error);
        }
      }

      if (error?.response?.data) {
        return Promise.reject(new AppError(error.response.data.message));
      }

      return Promise.reject(error);
    },
    [user]
  );

  useState(() => {
    api.interceptors.response.use((res) => res, refreshToken);
  });

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
