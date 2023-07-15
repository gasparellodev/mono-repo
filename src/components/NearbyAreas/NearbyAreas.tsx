import ball from "@assets/ball.png";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from "react-native-paper";

type NearbyAreasProps = {
    id: number;
    name: string;
    description: string;
    numberStar: number;
    numberAviations: number
}

export function NearbyAreas({ name, description, numberAviations, numberStar }: NearbyAreasProps) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={{ backgroundColor: colors.surfaceContainerHighest, height: 340, maxWidth: 280, flexDirection: 'column', padding: 8, gap: 4, borderRadius: 12 }}>
            <Text style={{ marginLeft: 4, fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
            <Image
                source={ball}
                alt='return'
                style={{ width: '100%', height: 200, borderRadius: 12 }}
            />
            <View>
                <Text style={{ fontSize: 16, marginVertical: 4 }}>{description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons size={20} name="star" color={colors.secondary} /> 
                    <Text style={{ marginLeft: 4, color: colors.primary, fontSize: 16 }}>{numberStar},7 - <Text style={{ fontSize: 16, marginTop: 10 }}>{numberAviations} avaliações</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}