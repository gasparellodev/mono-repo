import { ActivityIndicator } from "react-native";
import { Flex } from "./Flex";
import { useTheme } from "react-native-paper";

type Props = {
  size?: number;
};

export function Loading({ size = 46 }: Props) {
  const { colors } = useTheme();

  return (
    <Flex flex={1} justify="center" align="center">
      <ActivityIndicator size={size} color={colors.primary} />
    </Flex>
  );
}
