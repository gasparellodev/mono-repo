import { Flex } from "@components/Flex";
import { useAppTheme } from "../providers/ThemeProvider";
import logoWithoutName from "@assets/logo-without-name.png";
import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";

type Props = {
  title: string;
  isChangePassword?: boolean
};
export function AppHeader({ title, isChangePassword }: Props) {
  const { colors } = useAppTheme();

  const ALT_LOGO_WITHOU_NAME = "Logomarca do Eu Jogo App sem nome";
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function gotToNotifications() {
    if (isChangePassword) return navigation.navigate('profile');
    navigation.navigate('notifications');
  }
  return (
    <Flex
      direction="row"
      backgroundColor={colors.background}
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 18,
        paddingRight: 18,
      }}
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
        <View style={{ marginLeft: 16, marginRight: 16 }}>
          <MaterialIcons name="notifications" size={25} color={colors.primary} />
        </View>
      </TouchableOpacity>
      {/* <MaterialIcons name="notifications" color={colors.primary} size={24} /> */}
    </Flex>
  );
}
