import { FlatList } from "react-native-gesture-handler";
import { ArenaModelAvailableTime } from "src/interfaces/home/arenas";
import { AvailableTimeCard } from "./AvailableTimeCard";
import { Text } from "react-native-paper";

type Props = {
  availableTimes: ArenaModelAvailableTime[];
};

export function AvailableTimeCardList({ availableTimes }: Props) {
  if (!availableTimes.length) {
    return (
      <Text
        style={{
          textAlign: "center",
          padding: 24,
          fontSize: 18,
          fontWeight: "bold",
          color: "#37474F",
        }}
      >
        Não há arenas com horários disponíveis
      </Text>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
      data={availableTimes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AvailableTimeCard
          arena={item}
          height={80}
          width={200}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
