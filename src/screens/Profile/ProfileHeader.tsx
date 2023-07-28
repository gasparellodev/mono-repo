import { Flex } from "@components/Flex";
import { useImagePicker } from "@hooks/useImagePicker";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

interface ProfileHeaderProps {
  avatar_url: string;
  banner_url: string;
}

export function ProfileHeader({ avatar_url, banner_url }: ProfileHeaderProps) {
  const { colors } = useTheme();
  const { showImagePicker } = useImagePicker();

  const size = (Dimensions.get("window").width / 7) * 3;

  return (
    <Flex align="center" width="100%" style={{ paddingTop: 12 }}>
      <Image
        style={{
          width: "100%",
          height: 64,
          position: "absolute",
        }}
        source={{ uri: banner_url }}
      />
      <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={showImagePicker}>
          <Image
            style={{
              width: size,
              height: size,
              borderColor: colors.background,
              borderWidth: 4,
              borderRadius: 999,
            }}
            source={{ uri: avatar_url }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: colors.primary,
            borderRadius: 24,
            position: "absolute",
            right: 0,
            borderColor: colors.background,
            borderWidth: 4,
          }}
        />
      </View>
    </Flex>
  );
}
