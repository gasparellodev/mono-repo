import { Flex } from "@components/Flex";
import { useAppTheme } from "../providers/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { Touchable, TouchableOpacity } from "react-native";

type Props = {
  backHandle: () => void;
};
export function BackHeader({ backHandle }: Props) {
  const { colors } = useAppTheme();
  return (
    <Flex
      direction="row"
      backgroundColor={colors.surfaceContainerLowest}
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 18,
        paddingRight: 18,
      }}
      align="center"
    >
      <TouchableOpacity onPress={backHandle}>
        <Flex direction="row" align="center">
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
          <Text style={{ marginLeft: 18 }}>Voltar</Text>
        </Flex>
      </TouchableOpacity>
    </Flex>
  );
}
