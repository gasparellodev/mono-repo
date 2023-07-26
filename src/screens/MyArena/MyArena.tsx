import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { AppHeader } from "@components/AppHeader";

import myArenaPage from "@assets/my-arena.png";
import { Image } from "react-native";
import { Button } from "@components/Forms/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import defaultArenaImg from "@assets/arena-default.png";
import { BodyMediumBold } from "@components/Text/BodyMediumBold";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ArenaResponse } from "../../interfaces/arena.response";
import { SafeAreaView } from "react-native-safe-area-context";

export function MyArena() {
  const [arena, setArena] = useState<ArenaResponse>({} as ArenaResponse);
  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenMyArenaRegister() {
    navigation.navigate("myArenaRegisterStack");
  }

  async function fetchArena() {
    try {
      const { data } = await api.get<ArenaResponse>("arenas");
      if (data !== null) {
        setArena(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchArena();
  }, []);

  return (
    <Flex flex={1}>
        <VStack flex={1}>
          <AppHeader title="Minha arena" />
          {arena ? (
            <VStack style={{ paddingHorizontal: 24, marginTop: 32 }}>
              <VStack height={300}>
                <BodyMediumBold variant="bodyMediumBold">
                  {arena.name}
                </BodyMediumBold>
                <Image
                  source={defaultArenaImg}
                  style={{ height: "45%", width: "100%", borderRadius: 10 }}
                />
                <Button mode="outlined">Ver minhas quadras</Button>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate("myArenaConfigs")}
                >
                  Configuração da arena
                </Button>
              </VStack>
            </VStack>
          ) : (
            <VStack style={{ paddingHorizontal: 24, marginTop: 52 }}>
              <Flex align="center">
                <Image
                  source={myArenaPage}
                  style={{ height: "70%", resizeMode: "contain" }}
                />
              </Flex>

              <Button onPress={handleOpenMyArenaRegister}>
                Cadastrar minha arena
              </Button>
            </VStack>
          )}
        </VStack>
    </Flex>
  );
}
