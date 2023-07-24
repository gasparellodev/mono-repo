import { Flex } from "@components/Flex";
import { InputPlace } from "@components/Forms/InputPlace";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalization } from "@hooks/useLocalization";
import { RefObject, forwardRef, useMemo, useState } from "react";
import { View } from "react-native";
import { Text, TextInput, TouchableRipple, useTheme } from "react-native-paper";

interface LocationBottomSheetProps {
  title: string;
}

export const LocationBottomSheet = forwardRef<
  BottomSheetModal,
  LocationBottomSheetProps
>(({ title, ...props }, ref) => {
  const { colors } = useTheme();
  const { getCurrentLocation } = useLocalization();

  const [addressValue, setAddressValue] = useState("");

  const snapPoints = useMemo(() => ["50%", "50%"], []);

  function closeOnSelect() {
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
            paddingBottom: 32,
          }}
        >
          <InputPlace
            placeholder="Buscar endereço"
            value={addressValue}
            onChangeText={setAddressValue}
            left={<TextInput.Icon icon="magnify" />}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            onSelect={() => {
              closeOnSelect()
              setAddressValue("")
            }}
          />
          <TouchableRipple
            onPress={() => {
              getCurrentLocation();
              closeOnSelect();
            }}
          >
            <View>
              <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16 }}>
                Usar minha localização
              </Text>
              <Text style={{ fontSize: 12 }}>
                Ative sua localização para encontrar sua quadra
              </Text>
            </View>
          </TouchableRipple>
        </Flex>
      </Flex>
    </BottomSheetModal>
  );
});
