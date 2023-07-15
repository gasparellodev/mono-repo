import { AvailableTimeCard } from "@components/AvailableTimeCard";
import { FilterGroup } from "@components/FilterGroup";
import { Flex } from "@components/Flex";
import { NearbyAreas } from "@components/NearbyAreas/NearbyAreas";
import { UserLocation } from "@components/UserLocation";
import { VStack } from "@components/VStack";
import { useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("");
  const [groups, setGroups] = useState([
    { label: "Ordenar", icon: "keyboard-arrow-down", key: "order" },
    { label: "Jogar de Noite", icon: undefined, key: "play_at_night" },
    { label: "Jogar de Tarde", icon: undefined, key: "play_at_afternoon" },
    { label: "Jogar de Dia", icon: undefined, key: "play_at_day" },
  ]);

  const [availableTimes, setAvailableTimes] = useState([
    { id: '1', name: 'Jogar de tarde', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '2', name: 'Jogar de noite', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '3', name: 'Jogar de manhã', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '4', name: 'Jogar de', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '5', name: 'futevolei', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '6', name: 'Futebol', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '7', name: 'Basquete', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: '8', name: 'Paintball', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 }
  ])

  const nearbyArenas = [
    { id: 1, name: 'Jogar de tarde', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 2, name: 'Jogar de noite', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 3, name: 'Jogar de manhã', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 4, name: 'Jogar de', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 5, name: 'futevolei', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 6, name: 'Futebol', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 7, name: 'Basquete', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 },
    { id: 8, name: 'Paintball', description: 'Aluguel de quadras de areia e quadras Society.', numberStar: 4, numberAviations: 6 }
  ]
  
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
          />
          <Text style={{ textAlign: 'left', marginLeft: 24, marginVertical: 16, fontSize: 20, fontWeight: 'bold', color: '#F0F6E9' }}>
            Horários disponíveis
          </Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
            data={availableTimes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AvailableTimeCard id={item.id} name={item.name} image={`https://ui-avatars.com/api/?name=${item.name}`} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={{ textAlign: 'left', marginLeft: 24, marginVertical: 16, fontSize: 20, fontWeight: 'bold', color: '#F0F6E9' }}>
            Arenas mais próxima de você
          </Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
            data={nearbyArenas}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <NearbyAreas {...item} />}
          />
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}
