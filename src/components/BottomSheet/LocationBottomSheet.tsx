import { Flex } from "@components/Flex";
import { Input } from "@components/Forms/Input";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RefObject, forwardRef, useMemo } from "react";
import { View } from "react-native";
import { Text, TextInput, TouchableRipple, useTheme } from "react-native-paper";

interface LocationBottomSheetProps {
  title: string;
  onSelect: (key: string) => void;
}

export const LocationBottomSheet = forwardRef<
  BottomSheetModal,
  LocationBottomSheetProps
>(({ title, onSelect, ...props }, ref) => {
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
          gap={-8}
          justify="center"
          backgroundColor="transparent"
          style={{
            padding: 16,
            paddingBottom: 32
          }}
        >
          <Input
            placeholder="Buscar endereço"
            left={<TextInput.Icon icon="magnify" />}
            containerStyle={{
              backgroundColor: 'transparent',
            }}
          />
          <TouchableRipple onPress={() => {}}>
            <View>
            <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16 }}>Usar minha localização</Text>
            <Text style={{ fontSize: 12 }}>Ative sua lozalização para encontrar sua quadra</Text>
            </View>
          </TouchableRipple>
        </Flex>
      </Flex>
    </BottomSheetModal>
  );
});
