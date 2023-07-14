import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ball from "@assets/ball.png";
import star from "@assets/starts.png";

type NearbyAreasProps = {
    id: number;
    name: string;
    description: string;
    numberStar: number;
    numberAviations: number
}

export default function NearbyAreas({ name, description, numberAviations, numberStar }: NearbyAreasProps) {

    return (
        <View style={{ display: 'flex', width: "auto", height: 350, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ display: 'flex', backgroundColor: '#F0F6E9', height: 340, width: 280, flexDirection: 'column', padding: 8, marginRight: 5, marginLeft: 5, borderRadius: 12 }}>
                <Text style={{ textAlign: 'left', marginLeft: 4, fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
                <Image
                    source={ball}
                    alt='return'
                    style={{ width: 240, height: 200, borderRadius: 12, marginLeft: 4, marginTop: 5, marginBottom: 10 }}
                />
                <View>
                    <Text style={{ textAlign: 'left', marginLeft: 4, color: 'black', fontSize: 20 }}>{description}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <Image
                            source={star}
                            alt='return'
                            style={{ width: 20, height: 20, borderRadius: 12, marginLeft: 4, marginTop: 8 }}
                        />
                        <Text style={{ textAlign: 'left', marginLeft: 4, color: '#33BE3D', fontSize: 16, marginTop: 10 }}>{numberStar},7 -</Text>
                        <Text style={{ textAlign: 'left', marginLeft: 4, color: 'black', fontSize: 16, marginTop: 10 }}>{numberAviations}</Text>
                        <Text style={{ textAlign: 'left', marginLeft: 4, color: 'black', fontSize: 16, marginTop: 10 }}>avaliações </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}