import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../providers/ThemeProvider";

export function BackHeader() {
  const { colors } = useAppTheme();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  return (
    <Flex direction="row" align="center" height={56}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          height: "100%",
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Flex direction="row" align="center" gap={8}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={colors.inverseSurface}
          />
          <Text
            style={{
              color: colors.inverseSurface,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Voltar
          </Text>
        </Flex>
      </TouchableOpacity>
    </Flex>
  );
}
