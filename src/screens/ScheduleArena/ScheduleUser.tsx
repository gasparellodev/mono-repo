import { Flex } from "@components/Flex";
import { Image } from "react-native";
import { Text } from "react-native-paper";

interface ScheduleUserProps {
  name: string;
  avatar_url: string;
}

export function ScheduleUser({ name, avatar_url }: ScheduleUserProps) {
  return (
    <Flex direction="row" align="center" gap={10} style={{ marginBottom: 4 }}>
      <Image
        source={{ uri: avatar_url }}
        style={{ width: 32, height: 32, borderRadius: 16 }}
      />
      <Text>{name}</Text>
    </Flex>
  );
}
