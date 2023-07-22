import { AvailableTimeCard } from "@components/AvailableTimeCard";
import { FilterGroup } from "@components/FilterGroup";
import { Flex } from "@components/Flex";
import { UserLocation } from "@components/UserLocation";
import { VStack } from "@components/VStack";
import { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeListOrderType } from "../../data/list-order-type";
import { useHome } from "./useHome";
import { useLocalization } from "@hooks/useLocalization";
import { Loading } from "@components/Loading";
import { NearbyArenasList } from "@components/NearbyAreas";

export function Home() {
  const { loading, nearbyArenas } = useHome();
  const { isGranted } = useLocalization();

  const [groupSelected, setGroupSelected] = useState("");
  const [groups, setGroups] = useState([
    { label: "Ordenar", icon: "keyboard-arrow-down", key: "order" },
    { label: "Jogar de Noite", icon: undefined, key: "play_at_night" },
    { label: "Jogar de Tarde", icon: undefined, key: "play_at_afternoon" },
    { label: "Jogar de Dia", icon: undefined, key: "play_at_day" },
  ]);

  const [availableTimes, setAvailableTimes] = useState([
    {
      id: "1",
      name: "Jogar de tarde",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "2",
      name: "Jogar de noite",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "3",
      name: "Jogar de manhã",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "4",
      name: "Jogar de",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "5",
      name: "futevolei",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "6",
      name: "Futebol",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "7",
      name: "Basquete",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
    {
      id: "8",
      name: "Paintball",
      description: "Aluguel de quadras de areia e quadras Society.",
      numberStar: 4,
      numberAviations: 6,
    },
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex flex={1}>
      <SafeAreaView>
        <VStack>
          <UserLocation />
          <FilterGroup
            data={groups}
            selected={groupSelected}
            selectChip={setGroupSelected}
            contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
            orderList={HomeListOrderType}
          />
          <Text
            style={{
              textAlign: "left",
              marginLeft: 24,
              marginVertical: 16,
              fontSize: 20,
              fontWeight: "bold",
              color: "#F0F6E9",
            }}
          >
            Horários disponíveis
          </Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
            data={availableTimes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AvailableTimeCard
                id={item.id}
                name={item.name}
                image={`https://ui-avatars.com/api/?name=${item.name}`}
                height={80}
                width={200}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text
            style={{
              textAlign: "left",
              marginLeft: 24,
              marginVertical: 16,
              fontSize: 20,
              fontWeight: "bold",
              color: "#F0F6E9",
            }}
          >
            Arenas mais próxima de você
          </Text>
          {isGranted ? (
            <NearbyArenasList nearbyArenas={nearbyArenas} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                padding: 24,
                fontSize: 18,
                fontWeight: "bold",
                color: "#F0F6E9",
              }}
            >
              Autorizar localização para ver arenas próximas
            </Text>
          )}
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}
