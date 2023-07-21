import { AppHeader } from "@components/AppHeader";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "./ProfileHeader";

export function Profile() {
  const { colors } = useTheme();
  const [isEnable, setIsEnable] = useState(true);
  const { user } = useAuth();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  // const user = {
  //   name: "Luiz Henrique dos Santos",
  //   nickname: "Louizinho",
  //   avatar_url:
  //     ,
  //   banner_url: ,
  //   game: "Beach Tennis",
  // };

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
          banner_url={
            user.banner_url ||
            "https://ui-avatars.com/api/?name=&background=random&size=50"
          }
          avatar_url={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${user.username}&size=300`
          }
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
              Joga - {user.favorite_sport}
            </Text>
          </Flex>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 18,
              width: "100%",
            }}
            onPress={handleSwitch}
            activeOpacity={0.9}
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
          </TouchableOpacity>
          <Flex width="100%" style={{ marginTop: "auto" }}>
            <Button onPress={handleEditProfile}>Editar Perfil</Button>
            <Button onPress={handleChangePassword}>Alterar senha</Button>
          </Flex>
        </View>

        <TouchableOpacity></TouchableOpacity>
      </SafeAreaView>
    </Flex>
  );
}
