import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type LocationObject,
  type LocationGeocodedAddress,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { toast } from "@backpackapp-io/react-native-toast";
import { Linking } from "react-native";

export type LocalizationContextDataProps = {
  location: LocationObject | null;
  address: LocationGeocodedAddress | null;
  isGranted: boolean;
  getCurrentLocation: () => Promise<void>;
  getCurrentAddress: (params: {
    latitude: number;
    longitude: number;
  }) => Promise<void>;
  requestPermission: () => Promise<void>;
};

type LocalizationContextProviderProps = PropsWithChildren;

export const LocalizationContext = createContext<LocalizationContextDataProps>(
  {} as LocalizationContextDataProps
);

export function LocalizationContextProvider({
  children,
}: LocalizationContextProviderProps) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [address, setAddress] = useState<LocationGeocodedAddress | null>(null);
  const [isGranted, setIsGranted] = useState<boolean>(false);

  const getCurrentLocation = useCallback(async () => {
    if (!isGranted) return;

    const currentPosition = await getCurrentPositionAsync();
    const [currentAddress] = await reverseGeocodeAsync(currentPosition.coords);

    setLocation(currentPosition);
    setAddress(currentAddress);
  }, [isGranted]);

  const getCurrentAddress = useCallback(
    async (params: { latitude: number; longitude: number }) => {
      const { latitude, longitude } = params;
      const [currentAddress] = await reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setLocation({ coords: { latitude, longitude } } as LocationObject);
      setAddress(currentAddress);
    },
    []
  );

  const requestLocationPermission = useCallback(async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      setIsGranted(true);
      getCurrentLocation();
      return;
    }

    toast.error("Para uso correto do App permita a localização");
  }, [getCurrentLocation]);

  const requestPermission = useCallback(async () => {
    Linking.openSettings();

    const { granted } = await requestForegroundPermissionsAsync();
    setIsGranted(granted);
    if (granted) getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const localizationContextData = useMemo<LocalizationContextDataProps>(
    () => ({
      location,
      isGranted,
      address,
      getCurrentLocation,
      requestPermission,
      getCurrentAddress,
    }),
    [
      location,
      isGranted,
      address,
      getCurrentLocation,
      requestPermission,
      getCurrentAddress,
    ]
  );

  return (
    <LocalizationContext.Provider value={localizationContextData}>
      {children}
    </LocalizationContext.Provider>
  );
}
