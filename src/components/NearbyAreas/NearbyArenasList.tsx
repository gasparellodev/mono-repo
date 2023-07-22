import { FlatList } from "react-native-gesture-handler";
import { NearbyAreas } from "./NearbyAreas";
import { NearbyArenasResponse } from "src/interfaces/home/nearbyArenas";
import { Text } from "react-native";

type Props = {
  nearbyArenas: NearbyArenasResponse[];
};

export function NearbyArenasList({ nearbyArenas }: Props) {
  if (!nearbyArenas.length) {
    return (
      <Text
        style={{
          textAlign: "center",
          padding: 24,
          fontSize: 18,
          fontWeight: "bold",
          color: "#F0F6E9",
        }}
      >
        Não há arenas próximas a você
      </Text>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
      data={nearbyArenas}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <NearbyAreas {...item} />}
    />
  );
}
