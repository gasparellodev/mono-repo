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
import { AppNavigationRoutesProps } from "@routes/app.routes";

interface PublicArenaProps {
  id: number;
  name: string;
  description: string;
}

const availableTimes = Array.from({ length: 16 }).fill('').map((_, index) => {
  const names = ['Beach Tennis', 'Society', 'Basquete'];
  const time = `${(index + 8).toString().padStart(2, '0')}:00`;

  return {
    id: time,
    time,
    name: `Quadra ${index + 1}`,
    description: `${names[Math.floor(Math.random() * names.length)]} ${index + 4}`,
    price: `R$ ${Math.floor(Math.random() * 100) + 50},00`
  }
});

const days = [
  { day: 1, weekDay: 'seg' },
  { day: 2, weekDay: 'ter' },
  { day: 3, weekDay: 'qua' },
  { day: 4, weekDay: 'qui' },
  { day: 5, weekDay: 'sex' },
  { day: 6, weekDay: 'sab' },
  { day: 7, weekDay: 'dom' },
]

export function PublicArena() {
  const route = useRoute();
  const { id, name, description } = route.params as PublicArenaProps;

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function gotToNotifications() {
    navigation.navigate('notifications');
  }


  const { colors } = useTheme();
  const [selectedTimeId, setSelectedTimeId] = useState("13:00");
  const [selectedDayId, setSelectedDayId] = useState(5);

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56, paddingHorizontal: 16 }}>
          <Text style={{ color: colors.inverseSurface, fontFamily: 'Poppins_700Bold' }}>Vila da praia</Text>
          <TouchableOpacity onPress={() => gotToNotifications()}>
            <View style={{ marginLeft: 16, marginRight: 16 }}>
              <MaterialIcons name="notifications" size={25} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, paddingHorizontal: 16, backgroundColor: colors.tertiaryContainer }}>
          <TouchableOpacity>
            <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            {
              days.map(({ day, weekDay }) => (
                <PublicArenaDay onSelect={setSelectedDayId} weekDay={weekDay} day={day} isActive={day === selectedDayId} isDisabled={day < 4} />
              ))
            }
          </View>
          <TouchableOpacity>
            <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {
            availableTimes.map(({ id, ...timeProps }) => (
              <PublicArenaTime isSelected={id === selectedTimeId} key={id} details={timeProps} onSelect={setSelectedTimeId} />
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </Flex>
  )
}