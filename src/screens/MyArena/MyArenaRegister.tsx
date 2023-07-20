import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { BackHeader } from "@components/BackHeader";
import { useNavigation } from "@react-navigation/native";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import React from "react";
import { BodyMediumBold } from "@components/Text/BodyMediumBold";
import MaskInput, { Masks } from "react-native-mask-input";
import { useCreateArena } from "@hooks/useCreateArena";
import { MyArenaRegisterStackRoutesProps } from "@routes/my-arena-register-stack.routes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myArenaRegisterSchema } from "@screens/schemas/my-arena-register.schema";
import { CreateArenaDTO } from "../../dtos/CreateArenaDTO";

type FormDataProps = {
  name: string;
  cnpj: string;
  phone: string;
};

export function MyArenaRegister() {
  const navigation = useNavigation<MyArenaRegisterStackRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(myArenaRegisterSchema),
  });
  const { setCreateArenaData } = useCreateArena();

  function handleBackNavigation() {
    navigation.goBack();
  }

  function handleNextPage({ name, cnpj, phone }: FormDataProps) {
    setCreateArenaData((prevData: CreateArenaDTO) => {
      const updatedData: CreateArenaDTO = {
        ...prevData,
        name,
        cnpj,
        phone,
      };
      return updatedData;
    });
    navigation.navigate("myArenaRegisterAddress");
  }

  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <BackHeader backHandle={handleBackNavigation} />
        <VStack flex={1} style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <BodyMediumBold variant="bodyMediumBold" style={{ marginBottom: 10 }}>
            Cadastrar arena
          </BodyMediumBold>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome da arena"
                placeholder="Coloque o nome da arena aqui"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="CNPJ"
                placeholder="0000000000/0001-00"
                render={(props) => (
                  <MaskInput
                    {...props}
                    mask={Masks.BRL_CNPJ}
                    onChangeText={(_, unmasked) => {
                      onChange(unmasked);
                    }}
                  />
                )}
                value={value}
                errorMessage={errors.cnpj?.message}
              />
            )}
            name="cnpj"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Número de telefone"
                placeholder="00 00000-0000"
                render={(props) => (
                  <MaskInput
                    {...props}
                    mask={Masks.BRL_PHONE}
                    onChangeText={(_, unmasked) => {
                      onChange(unmasked);
                    }}
                  />
                )}
                value={value}
                errorMessage={errors.phone?.message}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            )}
            name="phone"
          />

          <Button onPress={handleSubmit(handleNextPage)}>Continuar</Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
