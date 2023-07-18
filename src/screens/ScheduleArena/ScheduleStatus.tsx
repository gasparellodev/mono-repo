import { Flex } from "@components/Flex";
import { Text } from "react-native-paper";

interface ScheduleStatusProps {
  color: string;
  title: string;
  subtitle: string;
}

export function ScheduleStatus({
  color,
  title,
  subtitle,
}: ScheduleStatusProps) {
  return (
    <Flex backgroundColor={color} padding={16}>
      <Text style={{ fontFamily: "Poppins_700Bold" }}>{title}</Text>
      <Text>{subtitle}</Text>
    </Flex>
  );
}
