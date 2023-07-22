import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { HeaderAuthPage } from "@components/HeaderAuthPage";
import { Input } from "@components/Forms/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@components/Forms/Button";
import { useNavigation } from "@react-navigation/native";
import { signUpFirstStepSchema } from "@screens/schemas/sign-up-first-step.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpStackRoutesProps } from "@routes/sign-up-stack.routes";
import { useCreateUser } from "@hooks/useCreateUser";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

type FormDataProps = {
  email: string;
  password: string;
  password_confirmation: string;
};

export function SignUpFirstStep() {
  const navigation = useNavigation<SignUpStackRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpFirstStepSchema),
  });

  const { setCreateUserData } = useCreateUser();

  function handleNextPage({
    email,
    password,
    password_confirmation,
  }: FormDataProps) {
    setCreateUserData((prevData: CreateUserDTO) => {
      const updatedData: CreateUserDTO = {
        ...prevData,
        email,
        password,
        password_confirmation,
      };
      return updatedData;
    });
    navigation.navigate("signUpSecondStep");
  }

  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <HeaderAuthPage title="Faça seu cadastro" subTitle="Começar" />

        <KeyboardAwareScrollView extraScrollHeight={50}>
          <VStack style={{ paddingHorizontal: 24, paddingTop: 16 }} flex={1}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="E-mail"
                  placeholder="Coloque seu e-mail aqui"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  keyboardType="email-address"
                  autoComplete="email"
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Senha"
                  placeholder="Coloque sua senha aqui"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  autoComplete="password"
                />
              )}
              name="password"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Confirmacao de senha"
                  placeholder="Confirme sua senha aqui"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password_confirmation?.message}
                  autoComplete="password"
                />
              )}
              name="password_confirmation"
            />
            <Button onPress={handleSubmit(handleNextPage)}>Continuar</Button>
          </VStack>
        </KeyboardAwareScrollView>
      </VStack>
    </Flex>
  );
}
