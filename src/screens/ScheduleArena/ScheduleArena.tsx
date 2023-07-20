import { BackHeader } from "@components/BackHeader";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import {
  formatCurrency,
  formatLongDate,
  formatScheduleDate,
} from "@utils/Formatters";
import dayjs from "dayjs";
import { useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScheduleDTO } from "src/dtos/ScheduleDTO";
import { ScheduleStatus } from "./ScheduleStatus";
import { ScheduleUser } from "./ScheduleUser";

export function ScheduleArena() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const { arena } = route.params as AppRoutes["scheduleArena"];
  const { colors } = useTheme();

  const [confirmedUsers, setConfirmedUsers] = useState([
    {
      name: "Kauan Gouveia",
      avatar_url: "https://github.com/kauangouveia.png",
    },
    {
      name: "Diego Fernandes",
      avatar_url: "https://github.com/diego3g.png",
    },
  ]);
  const [currentStatus, setCurrentStatus] = useState<ScheduleDTO["status"]>(
    arena.status || "confirm"
  );

  const date = dayjs(arena.date);

  function callToArena() {
    console.log("LIGAR PARA A ARENA");
  }

  function howToGet() {
    console.log("COMO CHEGAR");
  }

  function reserveTime() {
    navigation.navigate("mySchedule");
  }

  function inviteFriend() {
    console.log("CONVIDAR AMIGO");
  }

  function requestTimeChange() {
    console.log("SOLICITAR TROCA DE HORÁRIO");
  }

  const statuses = {
    confirm: {
      color: colors.tertiaryContainer,
      title: arena.place,
      subtitle: arena.sport,
      primaryButton: "Reservar horário",
      secondaryButton: null,
      primaryAction: reserveTime,
      secondaryAction: null,
    },
    reserved: {
      color: colors.primaryContainer,
      title: "Reservado!",
      subtitle: "Convide seus amigos para jogar",
      primaryButton: "Como chegar",
      secondaryButton: "Convidar amigo pra jogar",
      primaryAction: howToGet,
      secondaryAction: inviteFriend,
    },
    pending: {
      color: colors.secondaryContainer,
      title: "Solicitado!",
      subtitle: "Aguarde o retorno da arena",
      primaryButton: "Ligar para arena",
      secondaryButton: "Solicitar troca de horário",
      primaryAction: callToArena,
      secondaryAction: requestTimeChange,
    },
    cancelled: {
      color: colors.errorContainer,
      title: "Cancelado!",
      subtitle: "Entre em contato com a arena",
      primaryButton: "Ligar para arena",
      secondaryButton: "Solicitar troca de horário",
      primaryAction: callToArena,
      secondaryAction: requestTimeChange,
    },
  };

  const statusData = statuses[currentStatus];

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader />
        <ScheduleStatus {...statusData} />
        <Flex gap={4} paddingX={16} paddingY={24}>
          {currentStatus === "confirm" ? (
            <>
              <Text style={{ fontSize: 16 }}>
                {formatScheduleDate(date, arena.time)}
              </Text>
              <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                {formatLongDate(date)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_700Bold",
                  marginVertical: 4,
                }}
              >
                Valor: {formatCurrency(arena.price)}
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  marginBottom: 12,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                }}
              >
                {confirmedUsers.length} confirmado
                {confirmedUsers.length > 1 ? "s" : ""}
              </Text>
              {confirmedUsers.map((user) => (
                <ScheduleUser
                  key={user.name}
                  name={user.name}
                  avatar_url={user.avatar_url}
                />
              ))}
            </>
          )}
        </Flex>
        <Flex paddingX={16} style={{ marginTop: "auto" }} gap={-16}>
          <Button onPress={statusData.primaryAction}>
            {statusData.primaryButton}
          </Button>
          {!!statusData.secondaryButton ? (
            <Button onPress={statusData.secondaryAction} mode="text">
              {statusData.secondaryButton}
            </Button>
          ) : null}
        </Flex>
      </SafeAreaView>
    </Flex>
  );
}
