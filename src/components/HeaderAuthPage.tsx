import { VStack } from "@components/VStack";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

type Props = {
  title: string;
  subTitle: string;
};

export function HeaderAuthPage({ title, subTitle }: Props) {
  const { colors } = useTheme();

  return (
    <VStack style={{ ...styles.container, backgroundColor: colors.primary }}>
      <Text
        variant="titleLarge"
        style={{
          color: colors.onPrimary,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          color: colors.onPrimary,
          textAlign: "center",
        }}
      >
        {subTitle}
      </Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 58,
    borderBottomStartRadius: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
