import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { Checkbox, Text } from "react-native-paper";
import { HeaderAuthPage } from "@components/HeaderAuthPage";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { useState } from "react";
import { useAppTheme } from "../providers/ThemeProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@screens/schemas/sign-in.schema";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { toast } from "@backpackapp-io/react-native-toast";
import { translations } from "../i18n/translations";
import { getMessage } from "@utils/GetMessage";

type FormDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useAppTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signInSchema),
  });

  const { singIn } = useAuth();

  async function handleSignIn({ email, password }: FormDataProps) {
    setIsLoading(true);
    try {
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi possivel entrar. Tente novamente mais tarde";

      setIsLoading(false);
      toast.error(title, { disableShadow: true, duration: 2000 });
    }
  }

  return (
    <Flex flex={1} backgroundColor={colors.surface}>
      <VStack>
        <HeaderAuthPage title="Acessar Eu Jogo" subTitle="Comecar" />
        <VStack style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Coloque seu e-mail aqui"
                label="E-mail"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Coloque sua senha aqui"
                label="Senha"
                secureTextEntry
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
            name="password"
          />

          <Flex direction="row" align="center" justify="space-between">
            <Checkbox.Item
              label="Lembrar"
              status={checked ? "checked" : "unchecked"}
              onPress={() => setChecked(!checked)}
              labelVariant="bodyMedium"
              mode="android"
              position="leading"
            />
            <Text variant="bodyMedium">Esqueci minha senha</Text>
          </Flex>

          <Button loading={isLoading} onPress={handleSubmit(handleSignIn)}>
            Acessar conta
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
