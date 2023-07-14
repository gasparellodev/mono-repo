import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { BackHeader } from "@components/BackHeader";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { BodyMediumBold } from "@components/Text/BodyMediumBold";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { MyArenaRegisterStackRoutesProps } from "@routes/my-arena-register-stack.routes";
import { Controller, useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myArenaRegisterSchema } from "@screens/schemas/my-arena-register.schema";
import { useCreateArena } from "@hooks/useCreateArena";
import { myArenaRegisterAddressSchema } from "@screens/schemas/my-arena-register-address.schema";
import { CreateArenaDTO } from "../../dtos/CreateArenaDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { toast } from "@backpackapp-io/react-native-toast";
import { getMessage } from "@utils/GetMessage";

type FormDataProps = {
  description: string;
  lat: number;
  lon: number;
};

export function MyArenaRegisterAddress() {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<MyArenaRegisterStackRoutesProps>();
  const navigationArena = useNavigation<AppNavigationRoutesProps>();

  function handleBackNavigation() {
    navigation.navigate("myArenaRegister");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(myArenaRegisterAddressSchema),
  });

  const latController = useController({
    control,
    name: "lat",
  });
  const lonController = useController({
    control,
    name: "lon",
  });
  const { setCreateArenaData, createArenaData } = useCreateArena();
  async function handleCreateArena({ description, lat, lon }: FormDataProps) {
    setLoading(true);
    setCreateArenaData((prevData: CreateArenaDTO) => {
      const updatedData: CreateArenaDTO = {
        ...prevData,
        description,
        lat,
        lon,
      };
      return updatedData;
    });
  }

  async function handleCallCreateArena() {
    navigationArena.navigate("myArenaCourtRegister");
    try {
      const { data } = await api.post("/arenas", createArenaData);
      if (data.id) {
        navigationArena.navigate("myArenaCourtRegister");
      }
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possivel entrar. Tente novamente mais tarde";

      setLoading(false);
      toast.error(title, { disableShadow: true, duration: 2000 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleCallCreateArena();
  }, [createArenaData]);

  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <BackHeader backHandle={handleBackNavigation} />
        <VStack flex={1} style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <BodyMediumBold variant="bodyMediumBold" style={{ marginBottom: 10 }}>
            Cadastrar endereço
          </BodyMediumBold>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <GooglePlacesAutocomplete
                query={{
                  key: "AIzaSyBElOlQi12b9MM5KJAG3g0OPGKjgOPvGww",
                  language: "pt-BR",
                  components: "country:br",
                }}
                fetchDetails={true}
                onPress={(data, details) => {
                  onChange(data.description);
                  if (details !== null) {
                    lonController.field.onChange(details.geometry.location.lng);
                    latController.field.onChange(details.geometry.location.lat);
                  }
                }}
                placeholder="Buscar Endereço"
                textInputProps={{
                  InputComp: Input,
                  label: "Endereço",
                  errorMessage:
                    errors.description?.message ||
                    errors.lat?.message ||
                    errors.lon?.message,
                }}
              />
            )}
            name="description"
          />
          <Button onPress={handleSubmit(handleCreateArena)} loading={loading}>
            Continuar
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
