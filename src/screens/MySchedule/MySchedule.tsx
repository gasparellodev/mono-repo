import myScheduleEmpty from "@assets/myScheduleEmpty.png";
import { AppHeader } from "@components/AppHeader";
import { FilterGroup } from "@components/FilterGroup";
import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { useAppProps } from "@hooks/useAppProps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { Image, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScheduleCard } from "./ScheduleCard";
import { ScheduleListOrderType  } from "../../data/list-order-type";

export function MySchedule() {
  const { schedule } = useAppProps();
  const [groupSelected, setGroupSelected] = useState("");
  const [groups, setGroups] = useState([
    { label: "Ordenar", icon: "keyboard-arrow-down", key: "order" },
    { label: "Jogar de Noite", icon: undefined, key: "play_at_night" },
    { label: "Jogar de Tarde", icon: undefined, key: "play_at_afternoon" },
    { label: "Jogar de Dia", icon: undefined, key: "play_at_day" },
  ]);

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function gotTo(route: any) {
    navigation.navigate(route);
  }

  return (
    <Flex flex={1}>
        <AppHeader title="Minha agenda" />
        <VStack>
          <FilterGroup
            data={groups}
            selected={groupSelected}
            selectChip={setGroupSelected}
            contentContainerStyle={{
              paddingHorizontal: 24,
              marginVertical: 16,
            }}
            orderList={ScheduleListOrderType}
          />
        </VStack>

        {schedule.list.length > 0 ? (
          <FlatList
            data={schedule.list}
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              width: "100%",
              paddingHorizontal: 24,
              gap: 12
            }}
            renderItem={({ item }) => (
              <ScheduleCard schedule={item} />
            )}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={myScheduleEmpty}
              alt="empty"
              style={{ width: "40%", height: "38%" }}
            />
          </View>
        )}
    </Flex>
  );
}
