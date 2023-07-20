import { Flex } from "@components/Flex";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { formatLongDate, formatScheduleDate } from "@utils/Formatters";
import dayjs from "dayjs";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { ScheduleDTO } from "src/dtos/ScheduleDTO";

interface ScheduleCardProps {
  schedule: ScheduleDTO;
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const { colors } = useTheme();

  const statusProps = {
    confirm: {
      color: colors.tertiaryContainer,
      text: "Confirmar",
    },
    reserved: {
      color: colors.primary,
      text: "Reservado",
    },
    pending: {
      color: colors.secondary,
      text: "Solicitado",
    },
    cancelled: {
      color: colors.error,
      text: "Cancelado",
    },
  };

  const date = dayjs(schedule.date);
  const { color, text } = statusProps[schedule.status];

  function handleGoToSchedulePage() {
    navigation.navigate("scheduleArena", { arena: schedule });
  }

  return (
    <TouchableRipple onPress={handleGoToSchedulePage}>
      <Flex
        backgroundColor={colors.backdrop}
        justify="center"
        padding={18}
        gap={12}
        style={{
          borderRadius: 8,
          borderWidth: 2,
          borderColor: color,
        }}
      >
        <Text style={{ fontFamily: "Poppins_700Bold" }}>{schedule.place}</Text>
        <Text>{formatScheduleDate(date, schedule.time)}</Text>
        <Text>{formatLongDate(date)}</Text>
        <Text
          style={{
            color: color,
            fontFamily: "Poppins_700Bold",
          }}
        >
          {text}
        </Text>
      </Flex>
    </TouchableRipple>
  );
}
