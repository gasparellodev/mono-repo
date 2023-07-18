import searchPageImage from "@assets/search-page.png";
import { AvailableTimeCard } from "@components/AvailableTimeCard";
import { Flex } from "@components/Flex";
import { Input } from "@components/Forms/Input";
import { UserLocation } from "@components/UserLocation";
import { VStack } from "@components/VStack";
import { useState } from "react";
import { FlatList, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../providers/ThemeProvider";

export function Search() {
  const { colors } = useAppTheme();

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

  const ALT_SEARCH_PAGE_IMG = "Imagem de pessoas com lupa na mão";

  const [searchValue, setSearchValue] = useState("");

  return (
    <Flex flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack flex={1}>
          <UserLocation />
          <VStack
            style={{
              paddingHorizontal: 24,
              paddingTop: 16,
              flex: 1,
            }}
          >
            <Input
              defHeight={false}
              left={<TextInput.Icon icon="magnify" />}
              placeholder="Buscar arena"
              onChangeText={setSearchValue}
              value={searchValue}
            />
            <Flex align="center" flex={1}>
              {searchValue.length > 0 ? (
                <FlatList
                  contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
                  data={availableTimes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <AvailableTimeCard
                      id={item.id}
                      name={item.name}
                      image={`https://ui-avatars.com/api/?name=${item.name}`}
                      height={80}
                      width="100%"
                    />
                  )}
                  style={{ width: "100%", flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <>
                  <Image
                    source={searchPageImage}
                    alt={ALT_SEARCH_PAGE_IMG}
                    style={{
                      width: 244,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    variant="bodyMediumBold"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Encontre sua arena favorita
                  </Text>
                </>
              )}
            </Flex>
          </VStack>
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}
