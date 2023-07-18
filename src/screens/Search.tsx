import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { UserLocation } from "@components/UserLocation";
import { Input } from "@components/Forms/Input";
import { useAppTheme } from "../providers/ThemeProvider";
import { Text, TextInput } from "react-native-paper";
import searchPageImage from "@assets/search-page.png";
import { FlatList, Image } from "react-native";
import { AvailableTimeCard } from "@components/AvailableTimeCard";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Search() {
  const { colors } = useAppTheme();

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

  const ALT_SEARCH_PAGE_IMG = "Imagem de pessoas com lupa na mão";

  return (
    <Flex flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack flex={1}>
          <UserLocation />
          <VStack
            style={{
              paddingHorizontal: 24,
              paddingTop: 16,
            }}
          >
            <Input defHeight={false} left={<TextInput.Icon icon="magnify" />} />
            <Flex align="center">
              {/* <Image
                source={searchPageImage}
                alt={ALT_SEARCH_PAGE_IMG}
                style={{
                  width: 244,
                  resizeMode: "contain",
                }}
              /> */}
              
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
                data={availableTimes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <AvailableTimeCard id={item.id} name={item.name} image={`https://ui-avatars.com/api/?name=${item.name}`} height={80} width="100%" />
                )}
                style={{ width: '100%', }}
                showsHorizontalScrollIndicator={false}
              />
            </Flex>
            <Text
              variant="bodyMediumBold"
              style={{
                textAlign: "center",
              }}
            >
              Encontre sua arena favorita
            </Text>
          </VStack>
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}
