import { Flex } from "@components/Flex";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject, forwardRef, useMemo } from "react";
import { FlatList } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

interface BaseBottomListSheetProps {
  title: string;
  list: {
    key: string;
    value: string;
  }[];
  onSelect: (value: string, key: string) => void;
}

export const BaseBottomListSheet = forwardRef<
  BottomSheetModal,
  BaseBottomListSheetProps
>(({ title, list, onSelect, ...props }, ref) => {
  const { colors } = useTheme();
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  function handleSelectItem(value: string, key: string) {
    onSelect(value, key);
    (ref as RefObject<BottomSheetModal>).current?.dismiss();
  }

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: colors.surfaceVariant,
      }}
      enablePanDownToClose
      enableDismissOnClose
      ref={ref}
      {...props}
    >
      <Flex flex={1} backgroundColor={colors.surfaceVariant}>
        <Text variant="bodyMedium" style={{ textAlign: "center" }}>
          {title}
        </Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <List.Item
              title={item.value}
              onPress={() => handleSelectItem(item.value, item.key)}
            />
          )}
        />
      </Flex>
    </BottomSheetModal>
  );
});
