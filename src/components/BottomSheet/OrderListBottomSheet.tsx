import { Flex } from "@components/Flex";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject, forwardRef, useMemo } from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { ListItem } from "../../data/list-order-type";

interface OrderListBottomSheetProps {
  title: string;
  onSelect: (key: string) => void;
  selectedId: string;
  list: ListItem[];
}

export const OrderListBottomSheet = forwardRef<
  BottomSheetModal,
  OrderListBottomSheetProps
>(({ title, onSelect, selectedId, list, ...props }, ref) => {
  const { colors } = useTheme();
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  function handleSelectItem(key: string) {
    onSelect(key);
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
      <Flex backgroundColor={colors.surfaceVariant}>
        <Text variant="bodyMedium" style={{ textAlign: "center" }}>
          {title}
        </Text>
        <Flex
          direction="row"
          wrap="wrap"
          gap={5}
          paddingY={32}
          justify="center"
          backgroundColor="transparent"
        >
          {list.map((item) => {
            const selectedColor =
              selectedId === item.key
                ? colors.primary
                : colors.onSurfaceVariant;

            return (
              <TouchableRipple
                onPress={() => handleSelectItem(item.key)}
                style={{ maxWidth: "30%", width: "100%" }}
                key={item.key}
              >
                <Flex
                  align="center"
                  gap={4}
                  width="100%"
                  backgroundColor="transparent"
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={36}
                    color={selectedColor}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      color: selectedColor,
                    }}
                  >
                    {item.text}
                  </Text>
                </Flex>
              </TouchableRipple>
            );
          })}
        </Flex>
      </Flex>
    </BottomSheetModal>
  );
});
