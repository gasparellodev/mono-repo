import { Flex } from "@components/Flex";
import { VStack } from "@components/VStack";
import { useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "react-native-paper";
import { UserLocation } from "@components/UserLocation";
import imageBackground from "@assets/messageNotification.png"
import { AppHeader } from "@components/AppHeader";

export function Notifications() {
    const route = useRoute();
    const { colors } = useTheme();

    return (
        <Flex flex={1} backgroundColor={colors.background}>
            <AppHeader title="Notificações" />
                <VStack
                    style={{
                        paddingHorizontal: 24,
                        paddingTop: 16,
                    }}
                >
                    <Flex align="center">
                        <Image
                            source={imageBackground}
                            alt='image background'
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
                        Suas notificações
                        apareceram aqui
                    </Text>
                </VStack>

        </Flex>
    )
}