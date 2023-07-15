import { Flex } from "@components/Flex";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../providers/ThemeProvider";

type AvailableTimeCardProps = {
  id: string;
  name: string;
  image: string;
}

export function AvailableTimeCard({ id, name, image }: AvailableTimeCardProps) {
  const { colors } = useAppTheme();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleSelectHour() {
        navigation.navigate('publicArena', { arena: { id, name } });
    }

  return (
    <TouchableOpacity onPress={handleSelectHour} activeOpacity={0.7}>
      <Flex
        direction="row"
        backgroundColor={colors.surfaceContainerHighest}
        style={{
          borderRadius: 10,
        }}
        height={80}
        width={200}
      >
        <Image
          source={{
            uri: image,
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
            {name}
          </Text>
          <Text variant="bodyMediumBold" style={{ color: colors.primary }}>
            Ver agenda
          </Text>
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
}
