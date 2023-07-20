import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { HeaderAuthPage } from "@components/HeaderAuthPage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { List, Text, useTheme } from "react-native-paper";
import { SportsList } from "../../data/sports-list";
import { FlatList } from "react-native";
import { FavoriteSchedulesList } from "../../data/favorite-schedules-list";
import { SelectInput } from "@components/Forms/SelectInput";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { FavoriteSport } from "../../enums/favorite-sport.enum";
import { FavoriteTime } from "../../enums/favorite-time.enum";
import { Controller, useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSecondStepSchema } from "@screens/schemas/sign-up-second-step.schema";
import { SignUpStackRoutesProps } from "@routes/sign-up-stack.routes";
import { useCreateUser } from "@hooks/useCreateUser";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

type FormDataProps = {
  name: string;
  nickname: string;
  favorite_sport: FavoriteSport;
  favorite_time: FavoriteTime;
  cellphone: string;
};

export function SignUpSecondStep() {
  const [selectDescription, setSelectDescription] = useState("");
  const [favoriteSport, setFavoriteSport] = useState("Selecione o esporte");
  const [favoriteTime, setFavoriteTime] = useState(
    "Selecione o horário favorito"
  );
  const [selectType, setSelectType] = useState("");

  const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  const navigation = useNavigation<SignUpStackRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpSecondStepSchema),
  });
  const favoriteSportController = useController({
    control,
    name: "favorite_sport",
  });
  const favoriteTimeController = useController({
    control,
    name: "favorite_time",
  });

  const { setCreateUserData, createUserData } = useCreateUser();

  function handleNextPage({
    name,
    nickname,
    favorite_sport,
    favorite_time,
    cellphone,
  }: FormDataProps) {
    setCreateUserData((prevData) => {
      const updatedData: CreateUserDTO = {
        ...prevData,
        nickname,
        name,
        favorite_time,
        favorite_sport,
        cellphone,
      };
      return updatedData;
    });

    navigation.navigate("signUpThirdStep");
  }

  function handleSelectFavoriteSport() {
    setSelectDescription("Selecione o esporte favorito");
    setSelectType("sport");
    bottomSheetRef.current?.present();
  }

  function handleSelectFavoriteTime() {
    setSelectDescription("Selecione o horário favorito");
    setSelectType("time"); // defina o tipo de input selecionado como "time"
    bottomSheetRef.current?.present();
  }

  function handleSetFavoriteSport(selectedValue: string, key: string) {
    setFavoriteSport(selectedValue);
    bottomSheetRef.current?.dismiss();
    favoriteSportController.field.onChange(key);
  }

  function handleSetFavoriteTime(selectedValue: string, key: string) {
    setFavoriteTime(selectedValue);
    bottomSheetRef.current?.dismiss();
    favoriteTimeController.field.onChange(key);
  }

  const selectData = useMemo(() => {
    if (selectType === "sport") {
      return SportsList;
    } else if (selectType === "time") {
      return FavoriteSchedulesList;
    }
    return [];
  }, [selectType]);

  const handleSetSelectedValue = useCallback(() => {
    if (selectType === "sport") {
      return handleSetFavoriteSport;
    } else if (selectType === "time") {
      return handleSetFavoriteTime;
    }
    return () => {};
  }, [selectType]);

  return (
    <BottomSheetModalProvider>
      <Flex flex={1}>
        <VStack flex={1}>
          <HeaderAuthPage title="Perfil" subTitle="Detalhes da conta" />

          <KeyboardAwareScrollView extraScrollHeight={50}>
            <VStack style={{ paddingHorizontal: 24, paddingTop: 16 }}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Nome"
                    placeholder="Coloque seu nome aqui"
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
                    placeholder="Coloque seu apelido aqui"
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
                    value={favoriteSport}
                    onChange={handleSelectFavoriteSport}
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
                    value={favoriteTime}
                    onChange={handleSelectFavoriteTime}
                    errorMessage={errors.favorite_time?.message}
                  />
                )}
                name="favorite_time"
              />

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Número de telefone"
                    placeholder="Coloque seu número aqui"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.cellphone?.message}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                  />
                )}
                name="cellphone"
              />

              <Button onPress={handleSubmit(handleNextPage)}>Continuar</Button>
            </VStack>
          </KeyboardAwareScrollView>
        </VStack>
      </Flex>

      <BottomSheetModal
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        backgroundStyle={{
          backgroundColor: colors.surfaceVariant,
        }}
        enablePanDownToClose
        enableDismissOnClose
      >
        <Flex flex={1} backgroundColor={colors.surfaceVariant}>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            {selectDescription}
          </Text>
          <FlatList
            data={selectData}
            renderItem={({ item }) => (
              <List.Item
                title={item.value}
                onPress={() => handleSetSelectedValue()(item.value, item.key)}
              />
            )}
          />
        </Flex>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
