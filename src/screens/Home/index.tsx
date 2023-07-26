import { AvailableTimeCard } from "@components/AvailableTimeCard";
import { FilterGroup } from "@components/FilterGroup";
import { Flex } from "@components/Flex";
import { UserLocation } from "@components/UserLocation";
import { VStack } from "@components/VStack";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeListOrderType } from "../../data/list-order-type";
import { useHome } from "./useHome";
import { useLocalization } from "@hooks/useLocalization";
import { Loading } from "@components/Loading";
import { NearbyArenasList } from "@components/NearbyAreas";
import { Button } from "@components/Forms/Button";
import { AvailableTimeCardList } from "@components/AvailableTimeCardList";

export function Home() {
  const { loading, nearbyArenas, availableTimes } = useHome();
  const { isGranted, requestPermission } = useLocalization();

  const [groupSelected, setGroupSelected] = useState("");
  const groups = useMemo(
    () => [
      { label: "Ordenar", icon: "keyboard-arrow-down", key: "order" },
      { label: "Jogar de Noite", icon: undefined, key: "play_at_night" },
      { label: "Jogar de Tarde", icon: undefined, key: "play_at_afternoon" },
      { label: "Jogar de Dia", icon: undefined, key: "play_at_day" },
    ],
    []
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex flex={1} style={{backgroundColor: '#F9FAF3'}}>
        <VStack>
          <UserLocation />
          <FilterGroup
            data={groups}
            selected={groupSelected}
            selectChip={setGroupSelected}
            contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
            orderList={HomeListOrderType}
          />
          {isGranted ? (
            <View style={{backgroundColor: '#F9FAF3'}}>
              <Text
                style={{
                  textAlign: "left",
                  marginLeft: 24,
                  marginVertical: 16,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#37474F",
                }}
              >
                Horários disponíveis
              </Text>

              <AvailableTimeCardList availableTimes={availableTimes} />
              <Text
                style={{
                  textAlign: "left",
                  marginLeft: 24,
                  marginVertical: 16,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#37474F",
                }}
              >
                Arenas mais próxima de você
              </Text>
              <NearbyArenasList nearbyArenas={nearbyArenas} />
            </View>
          ) : (
            <View style={{paddingHorizontal: 12, backgroundColor: '#F9FAF3'}}>
              <Text
                style={{
                  textAlign: "center",
                  padding: 24,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#37474F",
                }}
              >
                Autorizar localização para ver arenas próximas
              </Text>
              <Button onPress={requestPermission}>
                Permitir usar localização
              </Button>
            </View>
          )}
        </VStack>
    </Flex>
  );
}
