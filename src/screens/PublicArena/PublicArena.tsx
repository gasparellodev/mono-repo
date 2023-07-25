import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PublicArenaTime } from "./PublicArenaTime";
import { PublicArenaDay } from "./PublicArenaDay";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import dayjs from "dayjs";
import { AppHeader } from "@components/AppHeader";
import { AvailableSport } from "../../enums/available-sport.enum";

function getUpcomingDays(baseDay: Date) {
  const baseDate = dayjs(baseDay);

  const upcomingDays = [];

  for (let i = 3; i >= 1; i--) {
    upcomingDays.push(baseDate.subtract(i, "day").startOf("day").toDate());
  }

  upcomingDays.push(baseDate.startOf("day").toDate());

  for (let i = 1; i <= 3; i++) {
    upcomingDays.push(baseDate.add(i, "day").startOf("day").toDate());
  }

  return upcomingDays;
}

export function PublicArena() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const { arena } = route.params as AppRoutes["publicArena"];

  const { colors } = useTheme();
  const [selectedTimeId, setSelectedTimeId] = useState("13:00");

  const [baseDay, setBaseDay] = useState(dayjs().startOf("day").toDate());
  const [selectedDay, setSelectedDay] = useState(baseDay);
  const upcomingDays = getUpcomingDays(baseDay);

  function handleSubtractBaseDay() {
    setBaseDay(dayjs(baseDay).subtract(7, "day").toDate());
  }

  function handleAddBaseDay() {
    setBaseDay(dayjs(baseDay).add(7, "day").toDate());
  }

  function gotToNotifications() {
    navigation.navigate("notifications");
  }

  const courts = arena.courts.map((court) => {
    const availableTimes = court.availableTimes.map(
      (time) => time.hour.toString().padStart(2, "0") + ":00"
    );

    const mappedSport = () => {
      switch (court.sport) {
        case AvailableSport.BeachTennis:
          return "Beach Tennis";
        case AvailableSport.BasketballHall:
          return "Basquete em Quadra";
        case AvailableSport.FootVolley:
          return "Futevôlei";
        case AvailableSport.FutsalHall:
          return "Futsal em Quadra";
        case AvailableSport.HandballHall:
          return "Handebol em Quadra";
        case AvailableSport.Volleyball:
          return "Vôlei";
        case AvailableSport.SocietySynthetic:
          return "Futebol Society em Gramado Sintético";
        case AvailableSport.Tennis:
          return "Tênis";
        default:
          return "Esporte Indisponível";
      }
    };

    return {
      ...court,
      sport: mappedSport(),
      availableTimes,
    };
  });

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView>
        <AppHeader title={arena.name} />
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          height={60}
          paddingX={16}
          backgroundColor={colors.tertiaryContainer}
        >
          <TouchableOpacity
            onPress={handleSubtractBaseDay}
            disabled={dayjs(baseDay).isBefore()}
          >
            <MaterialIcons
              name="chevron-left"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Flex
            direction="row"
            flex={1}
            justify="space-around"
            align="center"
            backgroundColor="transparent"
          >
            {upcomingDays.map((day) => (
              <PublicArenaDay
                onSelect={setSelectedDay}
                day={day}
                isActive={day.toISOString() === selectedDay.toISOString()}
                isDisabled={dayjs(day).add(1, "day").isBefore()}
                key={day.toISOString()}
              />
            ))}
          </Flex>
          <TouchableOpacity onPress={handleAddBaseDay}>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </Flex>
        <ScrollView>
          {courts.map(({ id, ...details }) => (
            <PublicArenaTime
              isSelected={id === selectedTimeId}
              key={id}
              court={{
                ...details,
                id,
                date: selectedDay,
                sport: details.sport,
              }}
              onSelect={setSelectedTimeId}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Flex>
  );
}
