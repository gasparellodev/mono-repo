import { AppHeader } from "@components/AppHeader";
import { BackHeader } from "@components/BackHeader";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { VStack } from "@components/VStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoute } from "@react-navigation/native";
import { signUpFirstStepSchema } from "@screens/schemas/sign-up-first-step.schema";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type FormDataProps = {
  email: string;
  password: string;
  new_password: string;
  password_confirmation: string;
};

export function Password() {
  const route = useRoute();
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signUpFirstStepSchema),
  });

  const changePassword = ({
    email,
    password,
    password_confirmation,
    new_password,
  }: FormDataProps) => {
    console.log(email, password, password_confirmation, new_password);
  };

  return (
    <Flex flex={1} backgroundColor={colors.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader  />
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
            }}
          >
            Alterar senha
          </Text>
          <Text
            style={{
              color: "black",
            }}
          >
            Atualize sua senha
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
                label="Senha Atual"
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
                label="Nova senha"
                placeholder="Digite sua nova senha aqui"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password_confirmation?.message}
                autoComplete="password"
              />
            )}
            name="password_confirmation"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Confirmacao sua nova senha"
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
          <Button onPress={handleSubmit(changePassword)}>
            Salvar Alterações
          </Button>
          <Text style={{ textAlign: "center" }}>
            Enviaremos um email de confirmação
          </Text>
        </VStack>

        {/* </SafeAreaView> */}
      </SafeAreaView>
    </Flex>
  );
}
