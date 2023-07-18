import { Flex } from "@components/Flex";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, TouchableOpacity, View, Switch } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "react-native-paper";
import backgroundProfile from "@assets/Shape.png"
import profile from "@assets/profile.png"
import { AppHeader } from "@components/AppHeader";
import { useState } from "react";
import { AppNavigationRoutesProps } from "@routes/app.routes";


export function Profile() {
    const route = useRoute();
    const { colors } = useTheme();
    const [isEnable, setIsEnable] = useState(true)

    const navigation = useNavigation<AppNavigationRoutesProps>();

    function gotTo(route: any) {
        navigation.navigate(route);
    }

    const handleSwitch = () => setIsEnable(!isEnable)
    return (
        <Flex flex={1} backgroundColor={colors.background}>
            <SafeAreaView>
                <AppHeader title="Meu perfil" />
                <View style={{ width: '100%', height: '65%', alignItems: 'center' }}>

                    <View style={{ width: '100%', height: '50%', alignItems: 'center' }}>
                        <Image
                            style={{ width: '100%' }}
                            source={backgroundProfile}
                        />
                        <Image
                            style={{ width: '50%', height: '100%', position: 'absolute' }}
                            source={profile}
                        />
                    </View>
                    <View style={{ width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Luiz Henrique dos Santos</Text>
                        <Text style={{ textAlign: 'center', color: '#37474F', fontSize: 18, fontWeight: 'bold' }}>Apelido - Louizinho</Text>
                        <Text style={{ textAlign: 'center', color: '#37474F', fontSize: 18, fontWeight: 'bold' }}>Joga - Beach Tennis</Text>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 30 }}>
                        <Switch
                            trackColor={{ false: '#ffffff', true: '#00ff55' }}
                            thumbColor={!isEnable ? 'green' : 'white'}
                            onChange={handleSwitch}
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}

                            value={isEnable}
                        />
                        <View>
                            <Text>Eu jogo</Text>
                            <Text>Estou disponível para jogar</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', gap: 25 }}>
                    <TouchableOpacity style={{ width: 260, height: 60, backgroundColor: colors.backdrop, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => gotTo('settingProfile')}>
                        <Text style={{ textAlign: 'center', color: colors.primary, fontSize: 18, fontWeight: 'bold' }}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 260, height: 60, backgroundColor: colors.backdrop, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => gotTo('changePassword')}>
                        <Text style={{ textAlign: 'center', color: colors.primary, fontSize: 18, fontWeight: 'bold' }}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity></TouchableOpacity>
            </SafeAreaView>
        </Flex>
    )
}