import { Flex } from "@components/Flex";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TouchableOpacity, View, Switch } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import myScheduleEmpty from "@assets/myScheduleEmpty.png"
import { AppHeader } from "@components/AppHeader";
import { useState } from "react";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { FilterGroup } from "@components/FilterGroup";
import { VStack } from "@components/VStack";


export function MySchedule() {
    const route = useRoute();
    const { colors } = useTheme();

    const [mySchedule, setMySchedule] = useState([])
    const [isReserved, setIsReserved] = useState(false)
    const [isSolicited, setIsSolicited] = useState(false)
    const [isCancelled, setIsCancelled] = useState(true)
    const [groupSelected, setGroupSelected] = useState("");
    const [groups, setGroups] = useState([
        { label: "Ordenar", icon: "keyboard-arrow-down", key: "order" },
        { label: "Jogar de Noite", icon: undefined, key: "play_at_night" },
        { label: "Jogar de Tarde", icon: undefined, key: "play_at_afternoon" },
        { label: "Jogar de Dia", icon: undefined, key: "play_at_day" },
    ]);

    const navigation = useNavigation<AppNavigationRoutesProps>();

    function gotTo(route: any) {
        navigation.navigate(route);
    }

    return (
        <Flex flex={1}>
            <SafeAreaView >
                <AppHeader title="Minha agenda" />
                <VStack>
                    <FilterGroup
                        data={groups}
                        selected={groupSelected}
                        selectChip={setGroupSelected}
                        contentContainerStyle={{ paddingHorizontal: 24, marginTop: 16 }}
                    />
                </VStack>

                {mySchedule.length < 0 && (
                    <View style={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={myScheduleEmpty} alt='empty' style={{ width: '40%', height: '38%' }} />
                    </View>
                )}

                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '96%', height: 180, backgroundColor: colors.backdrop, borderRadius: 8, justifyContent: 'center', paddingLeft: 18, paddingRight: 8, gap: 12, borderWidth: 2, borderColor: isCancelled ? colors.error : '' }}>
                        <Text style={{ textAlign: 'justify', fontWeight: 'bold' }}>Villa da Praia</Text>
                        <Text style={{ textAlign: 'justify' }}>Quinta-feira - 18:00 às 19:00</Text>
                        <Text style={{ textAlign: 'justify' }}>04 junho de 2023</Text>
                        <Text style={{ textAlign: 'justify', color: isReserved ? colors.primary : 'white' }}>Reservado</Text>
                    </View>
                </View>
            </SafeAreaView>
        </Flex>
    )
}