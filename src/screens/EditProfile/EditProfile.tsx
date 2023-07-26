import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackHeader } from "@components/BackHeader";
import { BaseBottomListSheet } from "@components/BottomSheet";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { SelectInput } from "@components/Forms/SelectInput";
import { VStack } from "@components/VStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import { EditProfileSchema } from "@screens/schemas/edit-profile.schema";

import { FavoriteSchedulesList } from "../../data/favorite-schedules-list";
import { SportsList } from "../../data/sports-list";
import { ProfileDTO } from "src/dtos/ProfileDTO";
import { AuthIntegration } from "@services/integrations/AuthIntegration";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { toast } from "@backpackapp-io/react-native-toast";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";

type ModalDataProps = {
  key: string | null;
  value: string;
};

export function EditProfile() {
  const authIntegration = new AuthIntegration();
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const { user, me } = useAuth();
  const { colors } = useTheme();
  const [favoriteTime, setFavoriteTime] = useState<ModalDataProps>({
    key: null,
    value: "Selecione o horário favorito",
  });
  const [favoriteSport, setFavoriteSport] = useState<ModalDataProps>({
    key: null,
    value: "Selecione o esporte",
  });
  const [loading, setLoading] = useState(false);

  const favoriteTimeBottomSheetRef = useRef<BottomSheetModal>(null);
  const favoriteSportBottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenFavoriteTime = () =>
    favoriteTimeBottomSheetRef.current?.present();
  const handleOpenFavoriteSport = () =>
    favoriteSportBottomSheetRef.current?.present();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDTO>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name,
      nickname: user.nickname,
      favorite_sport: user.favorite_sport,
      favorite_time: user.favorite_time,
    },
  });

  const handleChangeProfile = async (props: ProfileDTO) => {
    try {
      setLoading(true);
      props = {
        ...props,
        favorite_sport: favoriteSport.key!,
        favorite_time: favoriteTime.key!,
      };

      await authIntegration.changeProfile(props);
      await me();
      toast.success("Perfil atualizado com sucesso");
      navigation.navigate("profile");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possível atualizar conta. Tente novamente mais tarde";

      toast.error(title);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex flex={1} backgroundColor={colors.background}>
        <BackHeader />
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            Editar perfil
          </Text>
          <Text
            style={{
              color: "black",
            }}
          >
            Atualize todos seus dados
          </Text>
        </View>
        <VStack
          style={{
            paddingHorizontal: 24,
            paddingTop: 16,
            flexDirection: "column",
            gap: 15,
          }}
          flex={1}
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome completo"
                placeholder="Fulano da silva junior"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                autoComplete="name"
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Apelido"
                placeholder="Fulano"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.nickname?.message}
                autoComplete="username"
              />
            )}
            name="nickname"
          />
          <Controller
            control={control}
            render={() => (
              <SelectInput
                label="Esporte favorito"
                value={favoriteSport.value}
                onChange={handleOpenFavoriteSport}
                errorMessage={errors.favorite_sport?.message}
              />
            )}
            name="favorite_sport"
          />

          <Controller
            control={control}
            render={() => (
              <SelectInput
                label="Horário favorito"
                value={favoriteTime.value}
                onChange={handleOpenFavoriteTime}
                errorMessage={errors.favorite_time?.message}
              />
            )}
            name="favorite_time"
          />
          <Button
            onPress={handleSubmit(handleChangeProfile)}
            loading={loading}
            disabled={!favoriteSport.key || !favoriteTime.key || loading}
          >
            Salvar Alterações
          </Button>
        </VStack>

        <BaseBottomListSheet
          title="Selecione o esporte favorito"
          list={SportsList}
          onSelect={(value, key) => setFavoriteSport({ key, value })}
          ref={favoriteSportBottomSheetRef}
        />

        <BaseBottomListSheet
          title="Selecione o horário favorito"
          list={FavoriteSchedulesList}
          onSelect={(value, key) => setFavoriteTime({ key, value })}
          ref={favoriteTimeBottomSheetRef}
        />
    </Flex>
  );
}
