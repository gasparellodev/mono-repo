import myScheduleEmpty from "@assets/myScheduleEmpty.png";
import { AppHeader } from "@components/AppHeader";
import { FilterGroup } from "@components/FilterGroup";
import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { Image, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export function MySchedule() {
  const route = useRoute();
  const { colors } = useTheme();

  const statusProps = {
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

  const [mySchedule, setMySchedule] = useState<{ status: "reserved" | "pending" | "cancelled"; date: string; }[]>([
    {
      status: "reserved",
      date: "2021-06-04T18:00:00.000Z",
    },
    {
      status: "pending",
      date: "2021-06-04T18:00:00.000Z",
    },
    {
      status: "cancelled",
      date: "2021-06-04T18:00:00.000Z",
    },
  ]);
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
      <SafeAreaView style={{ flex: 1 }}>
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
          />
        </VStack>

        {mySchedule.length > 0 ? (
          <FlatList
            data={mySchedule}
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              width: "100%",
              paddingHorizontal: 24,
              gap: 12
            }}
            renderItem={({ item }) => (
              <Flex
                backgroundColor={colors.backdrop}
                justify="center"
                padding={18}
                gap={12}
                style={{
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: statusProps[item.status].color,
                }}
              >
                <Text style={{ fontFamily: "Poppins_700Bold" }}>
                  Vila da Praia
                </Text>
                <Text>Quinta-feira - 18:00 às 19:00</Text>
                <Text>04 junho de 2023</Text>
                <Text
                  style={{
                    color: statusProps[item.status].color,
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  {statusProps[item.status].text}
                </Text>
              </Flex>
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
      </SafeAreaView>
    </Flex>
  );
}
