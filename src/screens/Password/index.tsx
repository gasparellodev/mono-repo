import { BackHeader } from "@components/BackHeader";
import { Flex } from "@components/Flex";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { VStack } from "@components/VStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePassword } from "./usePassword";
import { ChangePasswordDTO } from "src/dtos/ChangePasswordDTO";
import { changePasswordSchema } from "@screens/schemas/change-password.schema";

export function Password() {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordDTO>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { handleChangePassword } = usePassword();

  return (
    <Flex flex={1} backgroundColor={colors.background}>
        <BackHeader />
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
                label="Senha Atual"
                placeholder="Coloque sua senha aqui"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.oldPassword?.message}
                autoComplete="password"
              />
            )}
            name="oldPassword"
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
                label="Confirme sua nova senha"
                placeholder="Confirme sua senha aqui"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.confirmPassword?.message}
                autoComplete="password"
              />
            )}
            name="confirmPassword"
          />
          <Button onPress={handleSubmit(handleChangePassword)}>
            Salvar Alterações
          </Button>
          <Text style={{ textAlign: "center" }}>
            Enviaremos um email de confirmação
          </Text>
        </VStack>
    </Flex>
  );
}
