import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { ListItem } from "../data/list-order-type";
import { OrderListBottomSheet } from "./BottomSheet";

type Props = {
  data: ArrayLike<{ label: string; icon?: string; key: string }>;
  selected: string;
  selectChip: (prevState: string) => void;
  style?: StyleProp<ViewStyle>;
  styleChip?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  orderList: ListItem[];
};

export function FilterGroup({
  data,
  selected,
  selectChip,
  style,
  styleChip,
  contentContainerStyle,
  orderList,
}: Props) {
  const { colors } = useTheme();

  const [orderTypeId, setOrderTypeId] = useState(orderList[orderList.length -1].key);

  const listOrderBottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenListOrder = () => listOrderBottomSheetRef.current?.present();

  console.log({ data, selected });

  return (
    <FlatList
      style={style}
      contentContainerStyle={contentContainerStyle}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) =>
        item.key === "order" ? (
          <>
            <Chip
              style={{
                ...styleChip,
                marginRight: 4,
                backgroundColor: colors.backdrop,
                borderWidth: 1,
              }}
              onPress={handleOpenListOrder}
              icon={() => (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={16}
                  color={colors.onSecondaryContainer}
                />
              )}
            >
              {item.label}
            </Chip>

            <OrderListBottomSheet
              onSelect={setOrderTypeId}
              title="Selecione o tipo de ordenação"
              ref={listOrderBottomSheetRef}
              list={orderList}
              selectedId={orderTypeId}
            />
          </>
        ) : (
          <Chip
            style={{
              ...styleChip,
              marginRight: 4,
              backgroundColor: colors.backdrop,
              borderWidth: 1,
            }}
            onPress={() => selectChip(item.key)}
            selected={selected === item.key}
          >
            {item.label}
          </Chip>
        )
      }
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
