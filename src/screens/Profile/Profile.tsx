import { AppHeader } from "@components/AppHeader";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "./ProfileHeader";

export function Profile() {
  const route = useRoute();
  const { colors } = useTheme();
  const [isEnable, setIsEnable] = useState(true);

  const navigation = useNavigation<AppNavigationRoutesProps>();

  const user = {
    name: "Luiz Henrique dos Santos",
    nickname: "Louizinho",
    avatar_url:
      "https://ui-avatars.com/api/?name=Luiz+Henrique+dos+Santos&size=300",
    banner_url: "https://ui-avatars.com/api/?name=&background=random&size=300",
    game: "Beach Tennis",
  };

  function handleEditProfile() {
    navigation.navigate("settingProfile");
  }

  function handleChangePassword() {
    navigation.navigate("changePassword");
  }

  const handleSwitch = () => setIsEnable(!isEnable);
  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader title="Meu perfil" />
        <ProfileHeader
          banner_url={user.banner_url}
          avatar_url={user.avatar_url}
        />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <Flex width="100%" height="30%" justify="center" align="center">
            <Text
              style={{
                color: colors.onBackground,
                fontSize: 16,
                fontFamily: "Poppins_700Bold",
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                color: colors.onBackground,
              }}
            >
              Apelido - {user.nickname}
            </Text>
            <Text
              style={{
                color: colors.onBackground,
              }}
            >
              Joga - {user.game}
            </Text>
          </Flex>
          <Flex
            align="center"
            justify="center"
            direction="row"
            gap={18}
            width="100%"
          >
            <Switch
              trackColor={{ false: "#ffffff", true: "#00ff55" }}
              thumbColor={!isEnable ? "green" : "white"}
              onChange={handleSwitch}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={isEnable}
            />
            <Flex flex={1}>
              <Text
                style={{
                  color: colors.onBackground,
                  fontSize: 16,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Eu jogo
              </Text>
              <Text
                style={{
                  color: colors.onBackground,
                  fontSize: 12,
                }}
              >
                Estou disponível para jogar
              </Text>
            </Flex>
          </Flex>
          <Flex width="100%" style={{ marginTop: "auto" }}>
            <TouchableOpacity
              style={{ width: "100%" }}
              activeOpacity={0.7}
              onPress={handleChangePassword}
            >
              <Button mode="text">Editar Perfil</Button>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%" }}
              activeOpacity={0.7}
              onPress={handleEditProfile}
            >
              <Button mode="text">Alterar senha</Button>
            </TouchableOpacity>
          </Flex>
        </View>

        <TouchableOpacity></TouchableOpacity>
      </SafeAreaView>
    </Flex>
  );
}
