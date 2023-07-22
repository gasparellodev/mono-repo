import { toast } from "@backpackapp-io/react-native-toast";
import { useAuth } from "@hooks/useAuth";
import { useLocalization } from "@hooks/useLocalization";
import { ArenaIntegration } from "@services/integrations/ArenaIntegration";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { useCallback, useEffect, useState } from "react";
import { NearbyArenasResponse } from "src/interfaces/home/nearbyArenas";

export const useHome = () => {
  const { location, isGranted } = useLocalization();
  const arenaIntegration = new ArenaIntegration();

  const [nearbyArenas, setNearbyArenas] = useState<NearbyArenasResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNearbyArenas = useCallback(async () => {
    if (!isGranted) {
      setLoading(false);
      return;
    }

    try {
      const nearbyArenasResponse = await arenaIntegration.getNearbyArenas({
        latitude: location?.coords?.latitude ?? 0,
        longitude: location?.coords?.longitude ?? 0,
      });

      setNearbyArenas(nearbyArenasResponse);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possível listar arenas próximas. Tente novamente mais tarde";

      toast.error(title);
    } finally {
      setLoading(false);
    }
  }, [
    isGranted,
    location?.coords?.latitude,
    location?.coords?.longitude,
    setNearbyArenas,
  ]);

  useEffect(() => {
    fetchNearbyArenas();
  }, [fetchNearbyArenas]);

  return {
    loading,
    nearbyArenas,
  };
};
