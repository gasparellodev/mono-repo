import { toast } from "@backpackapp-io/react-native-toast";
import { AuthIntegration } from "@services/integrations/AuthIntegration";
import { AppError } from "@utils/AppError";
import { getMessage } from "@utils/GetMessage";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useAuth } from "./useAuth";

export type Image = {
  uri: string;
  name: string;
  type: string;
};

export function useImagePicker() {
  const { me } = useAuth();
  const authIntegration = new AuthIntegration();

  const [pickedImagePath, setPickedImagePath] = useState("");

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      toast.error("Você precisa permitir o acesso a galeria de fotos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const [photo] = result.assets;
      setPickedImagePath(photo.uri);

      await uploadImage({
        uri: photo.uri,
        name: photo.fileName ?? `image_${Date.now()}.jpg`,
        type: photo.type ?? "image/jpeg",
      });

      await me();
    }
  };

  const uploadImage = async (pickedImage: {
    uri: string;
    name: string;
    type: string;
  }) => {
    if (!pickedImage.uri) {
      return;
    }

    try {
      await authIntegration.changeAvatar({
        avatar: pickedImage,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? getMessage(error.message, "pt")
        : "Não foi atualizar foto. Tente novamente mais tarde";

      toast.error(title);
    }
  };

  return {
    showImagePicker,
    pickedImagePath,
  };
}
