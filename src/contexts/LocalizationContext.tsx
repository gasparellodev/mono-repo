import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { toast } from "@backpackapp-io/react-native-toast";

export type LocalizationContextDataProps = {
  location: LocationObject | null;
  isGranted: boolean;
};

type LocalizationContextProviderProps = PropsWithChildren;

export const LocalizationContext = createContext<LocalizationContextDataProps>(
  {} as LocalizationContextDataProps
);

export function LocalizationContextProvider({
  children,
}: LocalizationContextProviderProps) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [isGranted, setIsGranted] = useState<boolean>(false);

  const requestLocationPermission = useCallback(async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setIsGranted(true);
      return;
    }

    toast.error("Para uso correto do App permita a localização");
  }, [isGranted, location]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const localizationContextData = useMemo<LocalizationContextDataProps>(
    () => ({
      location,
      isGranted,
    }),
    [location, isGranted]
  );

  return (
    <LocalizationContext.Provider value={localizationContextData}>
      {children}
    </LocalizationContext.Provider>
  );
}
