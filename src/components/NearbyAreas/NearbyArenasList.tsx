import { FlatList } from "react-native-gesture-handler";
import { NearbyAreas } from "./NearbyAreas";
import { ArenaModel } from "src/interfaces/home/arenas";
import { Text } from "react-native";

type Props = {
  nearbyArenas: ArenaModel[];
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
