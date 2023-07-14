import { Flex, FlexProps } from "@components/Flex";
import { PropsWithChildren, ReactNode } from "react";
import { ViewStyle } from "react-native";

export function VStack({ children, ...rest }: PropsWithChildren<FlexProps>) {
  return (
    <Flex direction="column" {...rest}>
      {children}
    </Flex>
  );
}
