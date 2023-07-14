import { FlatList, StyleProp, ViewStyle } from "react-native";
import { Chip } from "react-native-paper";

type Props = {
  data: ArrayLike<{ label: string; icon?: string; key: string }>;
  selected: string;
  selectChip: (prevState: string) => void;
  style?: StyleProp<ViewStyle>;
  styleChip?: ViewStyle;
};
export function FilterGroup({
  data,
  selected,
  selectChip,
  style,
  styleChip,
}: Props) {
  return (
    <FlatList
      style={style}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Chip
          style={{ ...styleChip, marginRight: 4 }}
          onPress={() => selectChip(item.key)}
          selected={selected === item.key}
        >
          {item.label}
        </Chip>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
