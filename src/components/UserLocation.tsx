import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { LocationBottomSheet } from "./BottomSheet";
import { useLocalization } from "@hooks/useLocalization";

export function UserLocation() {
  const { colors } = useTheme();
  const { address } = useLocalization();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const locationBottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenLocation = () => locationBottomSheetRef.current?.present();

  function gotToNotifications() {
    navigation.navigate("notifications");
  }

  const completeAddress = [
    address?.street,
    address?.streetNumber,
    address?.district,
    address?.city,
    address?.region,
    address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Flex
      direction="row"
      backgroundColor={colors.surfaceVariant}
      justify="space-between"
      align="center"
      gap={8}
      height={60}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          height: "100%",
          marginHorizontal: 16,
        }}
        onPress={handleOpenLocation}
      >
        <Text ellipsizeMode="tail" numberOfLines={1}>
          {completeAddress || "Selecione seu endereço"}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={25}
          color={colors.primary}
        />
      </TouchableOpacity>

      <TouchableRipple
        onPress={() => gotToNotifications()}
        style={{
          width: 56,
          height: 56,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 28,
        }}
      >
        <MaterialIcons name="notifications" size={25} color={colors.primary} />
      </TouchableRipple>

      <LocationBottomSheet
        title="Selecione seu endereço"
        ref={locationBottomSheetRef}
      />
    </Flex>
  );
}
