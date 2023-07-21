import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { View, ViewStyle } from "react-native";
import { Flex } from "@components/Flex";

type Props = TextInputProps & {
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
}: Props) {
  const invalid = !!errorMessage;
  return (
    <Flex width={"100%"} style={containerStyle}>
      <TextInput
        {...rest}
        label={label}
        placeholder={placeholder}
        mode="outlined"
        style={{
          height: defHeight ? 56 : undefined,
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
