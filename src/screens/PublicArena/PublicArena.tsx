import { Flex } from "@components/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { PublicArenaTime } from "./PublicArenaTime";
import { PublicArenaDay } from "./PublicArenaDay";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import dayjs from 'dayjs';
import { AppHeader } from "@components/AppHeader";

const availableTimes = Array.from({ length: 16 }).fill('').map((_, index) => {
  const names = ['Beach Tennis', 'Society', 'Basquete'];
  const time = `${(index + 8).toString().padStart(2, '0')}:00`;

  return {
    id: time,
    time,
    place: `Quadra ${index + 1}`,
    sport: `${names[Math.floor(Math.random() * names.length)]} ${index + 4}`,
    price: Math.floor(Math.random() * 100) + 50,
  }
});

function getUpcomingDays(baseDay: Date) {
  const baseDate = dayjs(baseDay);

  const upcomingDays = [];

  for (let i = 3; i >= 1; i--) {
    upcomingDays.push(baseDate.subtract(i, 'day').startOf('day').toDate());
  }

  upcomingDays.push(baseDate.startOf('day').toDate());

  for (let i = 1; i <= 3; i++) {
    upcomingDays.push(baseDate.add(i, 'day').startOf('day').toDate());
  }

  return upcomingDays;
}

export function PublicArena() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const { arena } = route.params as AppRoutes['publicArena'];

  const { colors } = useTheme();
  const [selectedTimeId, setSelectedTimeId] = useState("13:00");

  const [baseDay, setBaseDay] = useState(dayjs().startOf('day').toDate());
  const [selectedDay, setSelectedDay] = useState(baseDay);
  const upcomingDays = getUpcomingDays(baseDay);

  function handleSubtractBaseDay() {
    setBaseDay(dayjs(baseDay).subtract(7, 'day').toDate());
  }

  function handleAddBaseDay() {
    setBaseDay(dayjs(baseDay).add(7, 'day').toDate());
  }

  function gotToNotifications() {
    navigation.navigate('notifications');
  }

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView>
        <AppHeader title={arena.place} />
        <Flex direction="row" justify="space-between" align="center" height={60} paddingX={16} backgroundColor={colors.tertiaryContainer}>
          <TouchableOpacity onPress={handleSubtractBaseDay} disabled={dayjs(baseDay).isBefore()}>
            <MaterialIcons name="chevron-left" size={24}  color={colors.primary} />
          </TouchableOpacity>
          <Flex direction="row" flex={1} justify="space-around" align="center" backgroundColor="transparent">
            {
              upcomingDays.map((day) => (
                <PublicArenaDay onSelect={setSelectedDay} day={day} isActive={day.toISOString() === selectedDay.toISOString()} isDisabled={dayjs(day).add(1, 'day').isBefore()} key={day.toISOString()} />
              ))
            }
          </Flex>
          <TouchableOpacity onPress={handleAddBaseDay}>
            <MaterialIcons name="chevron-right" size={24}  color={colors.primary} />
          </TouchableOpacity>
        </Flex>
        <ScrollView>
          {
            availableTimes.map(({ id, ...timeProps }) => (
              <PublicArenaTime isSelected={id === selectedTimeId} key={id} details={{
                ...timeProps,
                date: selectedDay,
              }} onSelect={setSelectedTimeId} />
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </Flex>
  )
}