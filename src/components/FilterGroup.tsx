import { FlatList, StyleProp, ViewStyle } from "react-native";
import { Chip, useTheme } from "react-native-paper";

type Props = {
  data: ArrayLike<{ label: string; icon?: string; key: string }>;
  selected: string;
  selectChip: (prevState: string) => void;
  style?: StyleProp<ViewStyle>;
  styleChip?: ViewStyle;
  contentContainerStyle?: ViewStyle;
};



export function FilterGroup({
  data,
  selected,
  selectChip,
  style,
  styleChip,
  contentContainerStyle
}: Props) {

  const { colors } = useTheme();

  return (
    <FlatList
      style={style}
      contentContainerStyle={contentContainerStyle}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Chip
          style={{ ...styleChip, marginRight: 4, backgroundColor: colors.backdrop, borderWidth: 1 }}
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
