import { toast } from "@backpackapp-io/react-native-toast";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { HeaderAuthPage } from "@components/HeaderAuthPage";
import { VStack } from "@components/VStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { signInSchema } from "@screens/schemas/sign-in.schema";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, Text, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../providers/ThemeProvider";

type FormDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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

  function handleGoToSignUp() {
    navigation.navigate("signUpStack");
  }

  function handleGoToRecoverPassword() {
    console.log("handleGoToRecoverPassword");
  }

  return (
    <Flex flex={1} backgroundColor={colors.surface}>
      <SafeAreaView style={{ flex: 1 }}>
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
                  keyboardType="email-address"
                  autoComplete="email"
                />
              )}
              name="email"
              defaultValue="alan.turing@gmail.com"
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
                  autoComplete="password"
                />
              )}
              name="password"
              defaultValue="123456Ik!"
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
              <TouchableRipple
                style={{
                  padding: 16,
                }}
                onPress={handleGoToRecoverPassword}
              >
                <Text variant="bodyMedium">Esqueci minha senha</Text>
              </TouchableRipple>
            </Flex>

            <Button
              loading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit(handleSignIn)}
            >
              Acessar conta
            </Button>
            <TouchableRipple
              style={{ paddingVertical: 8, width: "100%" }}
              onPress={handleGoToSignUp}
            >
              <Text style={{ textAlign: "center" }}>
                Não tenho cadastro?{" "}
                <Text style={{ color: colors.primary }}>Cadastrar agora</Text>
              </Text>
            </TouchableRipple>
          </VStack>
        </VStack>
      </SafeAreaView>
    </Flex>
  );
}
