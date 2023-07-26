import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { ViewStyle } from "react-native";
import { Flex } from "@components/Flex";

import { useAppTheme } from "../../providers/ThemeProvider";

export type InputProps = TextInputProps & {
  defHeight?: boolean;
  errorMessage?: string;
  containerStyle?: ViewStyle;
};

export function Input({
  label,
  placeholder,
  defHeight = true,
  errorMessage,
  containerStyle,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage;
  const { fonts } = useAppTheme();

  return (
    <Flex width={"100%"} style={containerStyle}>
      <TextInput
        {...rest}
        label={label}
        placeholder={placeholder}
        mode="outlined"
        style={{
          height: defHeight ? 56 : undefined,
          color: '#767873',
          ...fonts.bodyMedium,
          ...rest.style as object,
        }}
        outlineStyle={{
          borderRadius: 10,
        }}
        error={invalid}
      />
      <HelperText type="error" visible={invalid} style={{ marginBottom: 2 }}>
        {errorMessage}
      </HelperText>
    </Flex>
  );
}
