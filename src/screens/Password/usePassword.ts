import { toast } from "@backpackapp-io/react-native-toast";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { AuthIntegration } from "@services/integrations/AuthIntegration";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import { ChangePasswordDTO } from "src/dtos/ChangePasswordDTO";

export const usePassword = () => {
  const authIntegration = new AuthIntegration();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const handleChangePassword = async ({
    oldPassword,
    password,
    confirmPassword,
  }: ChangePasswordDTO) => {
    try {
      await authIntegration.changePassword({
        oldPassword,
        password,
        confirmPassword,
      });

      toast.success("Senha atualizada com sucesso");
      navigation.navigate("profile");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi atualizar sua senha. Tente novamente mais tarde";

      toast.error(title);
    }
  };

  return {
    handleChangePassword,
  };
};
