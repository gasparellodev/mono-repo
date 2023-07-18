import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import { formatCurrency } from "@utils/Formatters";
import dayjs from "dayjs";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScheduleStatus } from "./ScheduleStatus";
import { ScheduleUser } from "./ScheduleUser";

export function ScheduleArena() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const { arena } = route.params as AppRoutes["scheduleArena"];
  const { colors } = useTheme();

  const date = dayjs(arena.date);
  
  function callToArena() {
    console.log("LIGAR PARA A ARENA")
  }

  function howToGet() {
    console.log("COMO CHEGAR")
  }

  function reserveTime() {
    console.log("RESERVAR HORÁRIO")
  }

  function inviteFriend() {
    console.log("CONVIDAR AMIGO")
  }

  function requestTimeChange() {
    console.log("SOLICITAR TROCA DE HORÁRIO")
  }

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
  const [currentStatus, setCurrentStatus] = useState<
    "confirm" | "success" | "pending" | "cancelled"
  >("cancelled");
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
    success: {
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

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleGoBack}>
          <Flex
            direction="row"
            align="center"
            gap={8}
            paddingX={16}
            height={56}
          >
            <MaterialIcons
              name="chevron-left"
              size={25}
              color={colors.inverseSurface}
            />
            <Text
              style={{
                color: colors.inverseSurface,
                fontFamily: "Poppins_700Bold",
              }}
            >
              Voltar
            </Text>
          </Flex>
        </TouchableOpacity>
        <ScheduleStatus {...statusData} />
        <Flex gap={4} paddingX={16} paddingY={24}>
          {currentStatus === "confirm" ? (
            <>
              <Text style={{ fontSize: 16 }}>
                {date.format("dddd")} / {arena.time} às{" "}
                {dayjs(`2010-10-10T${arena.time}`)
                  .add(1, "hour")
                  .format("HH:mm")}
              </Text>
              <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                {date.format("DD MMMM YYYY")}
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
                <ScheduleUser name={user.name} avatar_url={user.avatar_url} />
              ))}
            </>
          )}
        </Flex>
        <Flex paddingX={16} style={{ marginTop: "auto" }} gap={-16}>
          <Button>{statusData.primaryButton}</Button>
          {!!statusData.secondaryButton ? (
            <Button mode="text">{statusData.secondaryButton}</Button>
          ) : null}
        </Flex>
      </SafeAreaView>
    </Flex>
  );
}
