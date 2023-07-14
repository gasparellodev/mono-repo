import { Flex } from "@components/Flex";
import { Text, useTheme } from "react-native-paper";
import { Image } from "react-native";
import { useAppTheme } from "../providers/ThemeProvider";
import { BodyMediumBold } from "@components/Text/BodyMediumBold";

export function HorizontalCard() {
  const { colors } = useAppTheme();
  return (
    <Flex
      direction="row"
      backgroundColor={colors.surfaceContainerHighest}
      style={{
        borderRadius: 10,
        marginTop: 16,
      }}
      height={80}
      width={200}
    >
      <Image
        source={{
          uri: "https://ui-avatars.com/api/?name=Vila+da+Praia",
        }}
        style={{ height: 80, width: 80, borderRadius: 10 }}
      />
      <Flex
        flex={1}
        backgroundColor="transparent"
        align="center"
        justify="center"
        style={{ padding: 5 }}
      >
        <Text variant="titleMedium" ellipsizeMode="tail" numberOfLines={1}>
          Vila da Praia
        </Text>
        <Text variant="bodyMediumBold" style={{ color: colors.primary }}>
          Ver agenda
        </Text>
      </Flex>
    </Flex>
  );
}
