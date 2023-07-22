import { BaseBottomListSheet } from "@components/BottomSheet/BaseBottomSheet";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { SelectInput } from "@components/Forms/SelectInput";
import { HeaderAuthPage } from "@components/HeaderAuthPage";
import { VStack } from "@components/VStack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@hooks/useCreateUser";
import { useNavigation } from "@react-navigation/native";
import { SignUpStackRoutesProps } from "@routes/sign-up-stack.routes";
import { signUpSecondStepSchema } from "@screens/schemas/sign-up-second-step.schema";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FavoriteSchedulesList } from "../../data/favorite-schedules-list";
import { SportsList } from "../../data/sports-list";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { FavoriteSport } from "../../enums/favorite-sport.enum";
import { FavoriteTime } from "../../enums/favorite-time.enum";

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

  const bottomSheetRef = useRef<BottomSheetModal>(null);

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

  const { setCreateUserData } = useCreateUser();

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

      <BaseBottomListSheet
        title={selectDescription}
        onSelect={handleSetSelectedValue()}
        list={selectData}
        ref={bottomSheetRef}
      />
    </Flex>
  );
}
