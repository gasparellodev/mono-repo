import searchPageImage from "@assets/search-page.png";
import { AvailableTimeCard } from "@components/AvailableTimeCard";
import { Flex } from "@components/Flex";
import { Input } from "@components/Forms/Input";
import { UserLocation } from "@components/UserLocation";
import { VStack } from "@components/VStack";
import { FlatList, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearch } from "./useSearch";
import { Loading } from "@components/Loading";

const ALT_SEARCH_PAGE_IMG = "Imagem de pessoas com lupa na mão";

export function Search() {
  const { searchValue, setSearchValue, arenas, loading } = useSearch();

  const renderListOrEmptyState = () => {
    if (!searchValue.trim()) {
      return (
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
      );
    }

    return (
      <Flex align="center" flex={1}>
        {arenas.length ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
            data={arenas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AvailableTimeCard arena={item} height={80} width="100%" />
            )}
            style={{ width: "100%", flex: 1 }}
            showsHorizontalScrollIndicator={false}
          />
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
            Não há arenas com nome "{searchValue}"
          </Text>
        )}
      </Flex>
    );
  };

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

            {loading ? <Loading /> : renderListOrEmptyState()}
          </VStack>
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}
