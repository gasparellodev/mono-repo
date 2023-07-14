import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { UserLocation } from "@components/UserLocation";
import { Input } from "@components/Forms/Input";
import { useAppTheme } from "../providers/ThemeProvider";
import { Text, TextInput } from "react-native-paper";
import searchPageImage from "@assets/search-page.png";
import { Image } from "react-native";

export function Search() {
  const { colors } = useAppTheme();

  const ALT_SEARCH_PAGE_IMG = "Imagem de pessoas com lupa na mão";
  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <UserLocation />
        <VStack
          style={{
            paddingHorizontal: 24,
            paddingTop: 16,
          }}
        >
          <Input defHeight={false} left={<TextInput.Icon icon="magnify" />} />
          <Flex align="center">
            <Image
              source={searchPageImage}
              alt={ALT_SEARCH_PAGE_IMG}
              style={{
                width: 244,
                resizeMode: "contain",
              }}
            />
          </Flex>
          <Text
            variant="bodyMediumBold"
            style={{
              textAlign: "center",
            }}
          >
            Encontre sua arena favorita
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
}
