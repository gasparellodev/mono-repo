import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function UserLocation() {
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function gotToNotifications() {
    navigation.navigate("notifications");
  }

  return (
    <Flex
      direction="row"
      padding={16}
      backgroundColor={colors.surfaceVariant}
      justify="space-between"
      align="center"
      gap={8}
    >
      <TouchableOpacity style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
        <Text ellipsizeMode="tail" numberOfLines={1}>
          Rua Selecionada 32, Bairro, Cidade, Estado - País
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={25}
          color={colors.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => gotToNotifications()}>
        <MaterialIcons name="notifications" size={25} color={colors.primary} />
      </TouchableOpacity>
    </Flex>
  );
}
