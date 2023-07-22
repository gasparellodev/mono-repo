import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { HeaderAuthPage } from "@components/HeaderAuthPage";
import { Button } from "@components/Forms/Button";
import { RadioButton, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useCreateUser } from "@hooks/useCreateUser";
import { Role } from "../../enums/role.enum";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpThirdStepSchema } from "@screens/schemas/sign-up-third-step.schema";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { toast } from "@backpackapp-io/react-native-toast";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { SignUpIntegration } from "@services/integrations";

type FormDataProps = {
  role: Role;
};
export function SignUpThirdStep() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const signUpIntegration = new SignUpIntegration();

  const [loading, setLoading] = useState(false);
  const { setCreateUserData, createUserData } = useCreateUser();

  const PRE_SELECTED_RADIO = Role.Player;

  const { control, handleSubmit } = useForm<FormDataProps>({
    resolver: zodResolver(signUpThirdStepSchema),
  });

  async function handleUpdateCreateUserData({ role }: FormDataProps) {
    try {
      setLoading(true);
      setCreateUserData((prevData) => {
        const updatedData: CreateUserDTO = {
          ...prevData,
          role,
        };
        return updatedData;
      });

      await signUpIntegration.execute(createUserData);

      toast.success("Conta criada com sucesso");
      navigation.navigate("signIn");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possível criar conta. Tente novamente mais tarde";

      toast.error(title);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleCallRegister();
  }, [createUserData]);

  async function handleCallRegister() {
    console.log(createUserData);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <HeaderAuthPage title="Tipo de conta" subTitle="Detalhes da conta" />

        <VStack
          style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16 }}
          flex={1}
        >
          <Flex>
            <Controller
              defaultValue={PRE_SELECTED_RADIO}
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <Flex
                    direction="row"
                    width={180}
                    align="center"
                    style={{ marginTop: 16 }}
                  >
                    <RadioButton.Android value={Role.Arena} />
                    <VStack>
                      <Text variant="titleLarge">Sou dono</Text>
                      <Text variant="bodyMedium">
                        Quero cadastrar arena e minhas quadras
                      </Text>
                    </VStack>
                  </Flex>
                  <Flex
                    direction="row"
                    width={180}
                    align="center"
                    style={{ marginTop: 32, marginBottom: 16 }}
                  >
                    <RadioButton.Android value={Role.Player} />
                    <VStack>
                      <Text variant="titleLarge">Eu jogo</Text>
                      <Text variant="bodyMedium">
                        Quero jogar, encontrar uma arena e quadras
                      </Text>
                    </VStack>
                  </Flex>
                </RadioButton.Group>
              )}
              name="role"
            />
          </Flex>
          <Button
            onPress={handleSubmit(handleUpdateCreateUserData)}
            loading={loading}
          >
            Continuar
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
