import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { Image } from "react-native";
import defaultHeaderArenaImg from "@assets/header-arena.png";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useAppTheme } from "../../providers/ThemeProvider";
import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import { BodyMediumBold } from "@components/Text/BodyMediumBold";

export function MyArenaConfigs() {
  const { colors } = useAppTheme();
  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <VStack
          height={130}
          style={{ borderRadius: 20, borderBottomLeftRadius: 20 }}
        >
          <Image
            source={defaultHeaderArenaImg}
            style={{
              height: 130,
              width: "100%",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />

          <Flex
            direction="row"
            align="center"
            style={{ position: "absolute", marginTop: 18, marginLeft: 18 }}
            backgroundColor={"transparent"}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.onPrimary}
            />
            <BodyMediumBold
              variant="bodyMediumBold"
              style={{ marginLeft: 20, color: colors.onPrimary }}
            >
              Voltar
            </BodyMediumBold>
          </Flex>
        </VStack>
      </VStack>
    </Flex>
  );
}
