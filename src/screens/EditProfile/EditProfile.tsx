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

type FormDataProps = {
  name: string;
  nickname: string;
  favorite_sport: string;
  favorite_time: string;
};

type ModalDataProps = {
  key: string | null;
  value: string;
};

export function EditProfile() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [favoriteTime, setFavoriteTime] = useState<ModalDataProps>({
    key: null,
    value: "Selecione o horário favorito",
  });
  const [favoriteSport, setFavoriteSport] = useState<ModalDataProps>({
    key: null,
    value: "Selecione o esporte",
  });

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
  } = useForm<FormDataProps>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name,
      nickname: user.nickname,
      favorite_sport: user.favorite_sport,
      favorite_time: user.favorite_time,
    },
  });

  const changePassword = (props: FormDataProps) => {
    props = {
      ...props,
      favorite_sport: favoriteSport.key!,
      favorite_time: favoriteTime.key!,
    };

    console.log(props);
  };

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
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
            onPress={handleSubmit(changePassword)}
            disabled={!favoriteSport.key || !favoriteTime.key}
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
      </SafeAreaView>
    </Flex>
  );
}
