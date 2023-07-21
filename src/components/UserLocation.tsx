import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { HomeListOrderType } from "../data/list-order-type";
import { OrderListBottomSheet } from "./BottomSheet";

export function UserLocation() {
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const [orderTypeId, setOrderTypeId] = useState(HomeListOrderType[0].key);

  const listOrderBottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenListOrder = () => listOrderBottomSheetRef.current?.present();

  function gotToNotifications() {
    navigation.navigate("notifications");
  }

  return (
    <Flex
      direction="row"
      backgroundColor={colors.surfaceVariant}
      justify="space-between"
      align="center"
      gap={8}
      height={56}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          height: "100%",
          marginHorizontal: 16,
        }}
        onPress={handleOpenListOrder}
      >
        <Text ellipsizeMode="tail" numberOfLines={1}>
          Rua Selecionada 32, Bairro, Cidade, Estado - País
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

      <OrderListBottomSheet
        onSelect={setOrderTypeId}
        title="Selecione o tipo de ordenação"
        ref={listOrderBottomSheetRef}
        list={HomeListOrderType}
        selectedId={orderTypeId}
      />
    </Flex>
  );
}
