import { Flex } from "@components/Flex";
import arrow from "@assets/arrow.png";
import notification from "@assets/notifications.png";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import SlideOrder from "@components/Order/Order";
import SlideOrderAvailableHours from "@components/AvailableHours/Order/OrderAvailableHours";
import Footer from "@components/Footer/Footer";
import SlideOrderNearbyAreas from "@components/NearbyAreas/Order/OrderNearbyAreas";

export function HomeClient() {
    const { colors } = useTheme();
    return (
        <Flex flex={1}>
            <View style={{ height: '8%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 2, backgroundColor: colors.background, }}>
                <Text>
                    Ricardo Marcos de Madureira Moreira, 199
                </Text>
                <TouchableOpacity>
                    <Image
                        source={arrow}
                        alt='return'
                        style={{ width: 27, height: 24 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={notification}
                        alt='notification'
                        style={{ width: 25, height: 24 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: '82%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                <SlideOrder />
                <SlideOrderAvailableHours />
                <SlideOrderNearbyAreas />
            </View>
            <View style={{ height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 2, backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                <Footer />
            </View>
        </Flex >
    )
}