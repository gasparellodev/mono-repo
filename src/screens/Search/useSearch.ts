import { toast } from "@backpackapp-io/react-native-toast";
import { useDebounce } from "@hooks/useDebounce";
import { useLocalization } from "@hooks/useLocalization";
import { ArenaIntegration } from "@services/integrations/ArenaIntegration";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { useState } from "react";
import { ArenaModelAvailableTime } from "src/interfaces/home/arenas";

export const useSearch = () => {
  const { location, isGranted } = useLocalization();
  const arenaIntegration = new ArenaIntegration();

  const [searchValue, setSearchValue] = useState("");

  const [arenas, setArenas] = useState<ArenaModelAvailableTime[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArenas = async () => {
    if (!isGranted || !searchValue.trim()) {
      setLoading(false);
      return;
    }

    try {
      const arenasResponse = await arenaIntegration.getByName({
        latitude: location?.coords?.latitude ?? 0,
        longitude: location?.coords?.longitude ?? 0,
        name: searchValue,
      });

      setArenas(arenasResponse);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possível filtrar arenas.";

      toast.error(title);
    } finally {
      setLoading(false);
    }
  };

  useDebounce(fetchArenas, 1000, [
    searchValue,
    isGranted,
    location?.coords?.latitude,
    location?.coords?.longitude,
  ]);

  return {
    searchValue,
    setSearchValue,
    arenas,
    loading,
  };
};
