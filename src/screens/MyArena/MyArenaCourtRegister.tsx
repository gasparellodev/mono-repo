import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { BackHeader } from "@components/BackHeader";
import { Checkbox, Text } from "react-native-paper";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { SelectInput } from "@components/Forms/SelectInput";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";

import defaultOne from "@assets/default-1.png";
import defaultTwo from "@assets/default-2.png";
import defaultThree from "@assets/default-3.png";
import { MaterialIcons } from "@expo/vector-icons";
import { BodyMediumBold } from "@components/Text/BodyMediumBold";

export function MyArenaCourtRegister() {
  const [checked, setChecked] = useState(false);

  const navigation = useNavigation<AppNavigationRoutesProps>();
  function handleBackNavigation() {
    navigation.goBack();
  }

  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <BackHeader backHandle={handleBackNavigation} />
        <VStack flex={1} style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <BodyMediumBold variant="bodyMediumBold" style={{ marginBottom: 10 }}>
            Cadastrar quadra
          </BodyMediumBold>
          <Input
            label="Nome da quadra"
            placeholder="Coloque o nome da quadra aqui"
          />
          <SelectInput
            label="Tipo de quadra"
            value="Selecione um tipo de quadra"
          />

          <Flex direction="row" align="center">
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
            />
            <Text>Quadra com cobertura</Text>
          </Flex>
          <Flex direction="row" align="center">
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
            />
            <Text>Quadra com Timer Digital</Text>
          </Flex>
          <Flex direction="row" align="center">
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
            />
            <Text>Quadra com Cam Replay</Text>
          </Flex>

          <Flex style={{ marginTop: 16 }}>
            <BodyMediumBold variant="bodyMediumBold">
              Adicionar foto da quadra
            </BodyMediumBold>
            <Text>Selecione uma imagem padrão</Text>

            <Flex
              direction="row"
              justify="space-between"
              style={{ marginTop: 16 }}
            >
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <MaterialIcons name="add-photo-alternate" size={46} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={defaultOne}
                  style={{ width: 56, height: 56, borderRadius: 10 }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={defaultTwo}
                  style={{ width: 56, height: 56, borderRadius: 10 }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={defaultThree}
                  style={{ width: 56, height: 56, borderRadius: 10 }}
                />
              </TouchableOpacity>
            </Flex>
          </Flex>

          <Flex style={{ marginTop: 16 }}>
            <Button>Continuar</Button>
          </Flex>
        </VStack>
      </VStack>
    </Flex>
  );
}
