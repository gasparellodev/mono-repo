import { Flex } from "@components/Flex";
import { useAppTheme } from "../providers/ThemeProvider";
import logoWithoutName from "@assets/logo-without-name.png";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

type Props = {
  title: string;
};
export function AppHeader({ title }: Props) {
  const { colors } = useAppTheme();

  const ALT_LOGO_WITHOU_NAME = "Logomarca do Eu Jogo App sem nome";

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
        <Text variant="bodyMediumBold">{title}</Text>
      </Flex>

      <MaterialIcons name="notifications" color={colors.primary} size={24} />
    </Flex>
  );
}
