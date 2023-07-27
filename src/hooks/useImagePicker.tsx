import { toast } from "@backpackapp-io/react-native-toast";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function useImagePicker() {
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
    }
  };

  return {
    showImagePicker,
    pickedImagePath,
  };
}
