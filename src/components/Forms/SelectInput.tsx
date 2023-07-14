import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { HelperText, Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

type Props = TouchableOpacityProps & {
  label: string;
  value: string;
  errorMessage?: string;
  onChange?: () => void;
};
export function SelectInput({
  label,
  value,
  errorMessage,
  onChange,
  ...rest
}: Props) {
  const { colors } = useTheme();
  const invalid = !!errorMessage;

  return (
    <TouchableOpacity {...rest} onPress={onChange}>
      <View>
        <View
          style={{ ...styles.container, backgroundColor: colors.background }}
        >
          <Text
            style={{
              fontSize: 12,
              color: invalid ? colors.error : colors.outline,
            }}
          >
            {label}
          </Text>
        </View>
        <View
          style={{
            ...styles.input,
            borderWidth: invalid ? 2 : 1,
            borderColor: invalid ? colors.error : colors.outline,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: invalid ? colors.error : colors.onSurface,
            }}
          >
            {value}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={25}
            color={invalid ? colors.error : colors.onSurface}
          />
        </View>
        <HelperText type="error" visible={invalid} style={{ marginBottom: 2 }}>
          {errorMessage}
        </HelperText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -6,
    left: 10,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    height: 56,
    marginTop: 4,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
});
