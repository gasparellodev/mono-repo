import { Button as PaperButton, ButtonProps } from "react-native-paper";
import { PropsWithChildren } from "react";

export function Button({ ...rest }: PropsWithChildren<ButtonProps>) {
  return (
    <PaperButton
      {...rest}
      mode={
        rest.mode === null || rest.mode === undefined ? "contained" : rest.mode
      }
      style={{
        borderRadius: 100,
        marginBottom: 16,
        marginTop: 6,
      }}
      contentStyle={{
        paddingVertical: 5,
        paddingHorizontal: 24,
      }}
      labelStyle={{
        fontSize: 14,
      }}
    />
  );
}
