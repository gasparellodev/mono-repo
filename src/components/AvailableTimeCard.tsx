import { Flex } from "@components/Flex";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../providers/ThemeProvider";
import { ArenaModelAvailableTime } from "src/interfaces/home/arenas";

type AvailableTimeCardProps = {
  arena: ArenaModelAvailableTime;
  width: any;
  height: any;
};

export function AvailableTimeCard({
  arena,
  width,
  height,
}: AvailableTimeCardProps) {
  const { colors } = useAppTheme();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleSelectHour() {
    navigation.navigate("publicArena", { arena });
  }

  return (
    <TouchableOpacity onPress={handleSelectHour} activeOpacity={0.7}>
      <Flex
        direction="row"
        backgroundColor={colors.surfaceContainerHighest}
        style={{
          borderRadius: 10,
        }}
        height={height}
        width={width}
      >
        <Image
          source={{
            uri:  arena.image ? arena.image : `https://ui-avatars.com/api/?name=${arena.name}`,
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
            {arena.name}
          </Text>
          <Text variant="bodyMediumBold" style={{ color: colors.primary }}>
            Ver agenda
          </Text>
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
}
