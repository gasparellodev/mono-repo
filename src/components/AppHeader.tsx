import logoWithoutName from "@assets/logo-without-name.png";
import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useAppTheme } from "../providers/ThemeProvider";

type Props = {
  title: string;
  isChangePassword?: boolean;
};
export function AppHeader({ title }: Props) {
  const { colors } = useAppTheme();

  const ALT_LOGO_WITHOU_NAME = "Logomarca do Eu Jogo App sem nome";
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function gotToNotifications() {
    navigation.navigate("notifications");
  }
  return (
    <Flex
      direction="row"
      backgroundColor={colors.background}
      paddingX={18}
      paddingY={20}
      justify="space-between"
      align="center"
    >
      <Flex direction="row" align="center">
        <Image
          source={logoWithoutName}
          alt={ALT_LOGO_WITHOU_NAME}
          style={{ width: 20, height: 24, marginRight: 16 }}
        />
        <TouchableOpacity onPress={() => gotToNotifications()}>
          <Text variant="bodyMediumBold">{title}</Text>
        </TouchableOpacity>
      </Flex>
      <TouchableOpacity onPress={() => gotToNotifications()}>
        <View>
          <MaterialIcons
            name="notifications"
            size={25}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>
      {/* <MaterialIcons name="notifications" color={colors.primary} size={24} /> */}
    </Flex>
  );
}
