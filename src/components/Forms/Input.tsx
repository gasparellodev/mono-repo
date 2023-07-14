import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { View } from "react-native";
import { Flex } from "@components/Flex";

type Props = TextInputProps & {
  defHeight?: boolean;
  errorMessage?: string;
};
export function Input({
  label,
  placeholder,
  defHeight = true,
  errorMessage,
  ...rest
}: Props) {
  const invalid = !!errorMessage;
  return (
    <Flex width={"100%"}>
      <TextInput
        {...rest}
        label={label}
        placeholder={placeholder}
        mode="outlined"
        style={{
          height: defHeight ? 56 : undefined,
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
